import { auth, db } from "./firebase.js";

import {
    doc,
    runTransaction,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const groups = {

group1:{limit:3,link:"https://chat.whatsapp.com/HYIJz4aYsz65ptCAIu4W0f?s=cl&p=a&mlu=2"},
group2:{limit:3,link:"https://chat.whatsapp.com/KpTnz5QcH25LkehdQWJqbc?s=cl&p=a&mlu=2"},
group3:{limit:6,link:"https://chat.whatsapp.com/JwoHVIsQdOR1CEW8EpZ7YQ?s=cl&p=a&mlu=2"},
group4:{limit:6,link:"https://chat.whatsapp.com/LpzktHnBG0D1gqwptDR3ym?s=cl&p=a&mlu=2"},
group5:{limit:4,link:"https://chat.whatsapp.com/JXHjLWdtJpyFWAIvVAAtmO?s=cl&p=a&mlu=2"},
group6:{limit:2,link:"https://chat.whatsapp.com/HhG7IFlq47f4j6zJtjKK4N?s=cl&p=a&mlu=2"},
group7:{limit:6,link:"https://chat.whatsapp.com/JVZWiSgHkrW6Zp7i0aqfGz?s=cl&p=a&mlu=2"},
group8:{limit:9,link:"https://chat.whatsapp.com/KSrJq8KNSDkIxZCSiAHW1Q?s=cl&p=a&mlu=2"},
group9:{limit:2,link:"https://chat.whatsapp.com/DHEAC5MjI8x237qQOHOYvV?s=cl&p=a&mlu=2"},
group10:{limit:4,link:"https://chat.whatsapp.com/D9A8eIvujr7JYfRSgT2fbb?s=cl&p=a&mlu=2"},
group11:{limit:2,link:"https://chat.whatsapp.com/Ft4wd78vsmZDw2IBsL6k59?s=cl&p=a&mlu=2"},
group12:{limit:6,link:"https://chat.whatsapp.com/CpUPpHlEvEuF5i2VfXY0i9?s=cl&p=a&mlu=2"},
group13:{limit:6,link:"https://chat.whatsapp.com/IwwQnzwwhdf8ojpbhA264p?s=cl&p=a&mlu=2"},
group14:{limit:6,link:"https://chat.whatsapp.com/Dd0if7kaVO57n8gSNQpjtT?s=cl&p=a&mlu=2"},
group15:{limit:3,link:"https://chat.whatsapp.com/FgD7AFvy6c8HachEsyk737?s=cl&p=a&mlu=2"},
group16:{limit:3,link:"https://chat.whatsapp.com/LEoUT3Awl9gHV1jBBMrP51?s=cl&p=a&mlu=2"},
group17:{limit:6,link:"https://chat.whatsapp.com/J1rEc4zXCIM61bgbr1AeAs?s=cl&p=a&mlu=2"},
group18:{limit:6,link:"https://chat.whatsapp.com/I2kdsot92OpGxnh5THl32D?s=cl&p=a&mlu=2"}

};

// عند تحميل الصفحة
auth.onAuthStateChanged(async(user)=>{

    if(!user){
        window.location.href="login.html";
        return;
    }

    const selectionRef=doc(db,"groupSelections",user.uid);
    const selectionSnap=await getDoc(selectionRef);

    const selectedGroup=selectionSnap.exists()
        ?selectionSnap.data().groupId
        :null;

    document.querySelectorAll(".join").forEach(btn=>{

        const id=btn.dataset.group;
        const ref=doc(db,"groups",id);

        // إذا كان المستخدم اختار مجموعة سابقاً
        if(selectedGroup){

            if(id!==selectedGroup){

                btn.innerHTML="تم اختيار مجموعة أخرى";
                btn.style.background="#888";
                btn.style.pointerEvents="none";
                btn.style.opacity=".6";

            }else{

                btn.innerHTML="مجموعتك الحالية";
                btn.style.background="#28a745";

            }

            return;
        }

        checkButton(btn,id,ref,user);

    });

});

async function checkButton(btn,id,ref,user){

    const snap=await getDoc(ref);

    if(snap.exists()){

        const data=snap.data();

        if((data.count||0)>=groups[id].limit){

            btn.innerHTML="اكتمل العدد";
            btn.style.background="#888";
            btn.style.pointerEvents="none";
            return;
        }

    }

    btn.addEventListener("click",async(e)=>{

        e.preventDefault();

        // تحقق مرة أخرى أن المستخدم لم يختر مجموعة
        const selectionRef=doc(db,"groupSelections",user.uid);
        const selectionSnap=await getDoc(selectionRef);

        if(selectionSnap.exists()){

            alert("لقد قمت باختيار مجموعة مسبقاً.");
            return;
        }

        try{

            await runTransaction(db,async(transaction)=>{

                const groupSnap=await transaction.get(ref);

                if(!groupSnap.exists()){

                    transaction.set(ref,{count:1});

                }else{

                    const count=groupSnap.data().count||0;

                    if(count>=groups[id].limit){

                        throw new Error("FULL");

                    }

                    transaction.update(ref,{
                        count:count+1
                    });

                }

                transaction.set(
                    selectionRef,
                    {
                        groupId:id,
                        joinedAt:new Date()
                    }
                );

            });

            window.open(groups[id].link,"_blank");

            location.reload();

        }catch(err){

            btn.innerHTML="اكتمل العدد";
            btn.style.background="#888";
            btn.style.pointerEvents="none";

        }

    });

}
