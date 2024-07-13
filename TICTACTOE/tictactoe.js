let boxes= document.querySelectorAll(".box");
let reset=document.querySelector(".reset");
let newGame=document.querySelector("#newGame");
let msgDis=document.querySelector(".msgcon");
let message=document.querySelector("#msg");
let turn0= true;//turn of player(x,o)
let draw=true;
let count=0;
let winner='';
const winPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const DisableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
       }
};

const Display= (Winner)=>{
      message.innerText=`Congratulations! ${Winner}`;
      msgDis.classList.remove("hide");
      DisableBoxes();
};
const checkWinner=()=>{
     for(let pattern of winPattern){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if( pos1!="" && pos2!="" && pos3!=""){
            if(pos1 ===pos2 &&pos2===pos3){
               Display(`Winner is ${pos1}`);
               draw=false;
            }
        }
     }
};
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0){
            box.innerText="X";
            turn0=false;
        }else{
            box.innerText="O";
            turn0=true;
        }
        box.disabled=true;

        checkWinner();
        count++;
        Draw();
    });
});

let Draw=()=>{
    if(count==9){
        if(!draw)
            console.log("not a draw");
        else
            Display("The match is Draw");
    }
}
const resetAct=()=>{
    turn0=true;
    draw=true;
    count=0;
   enableBoxes();
   msgDis.classList.add("hide");
};
reset.addEventListener("click",resetAct);
newGame.addEventListener("click",resetAct);
