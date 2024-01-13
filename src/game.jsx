import React, { useState, useEffect } from 'react';
import './game.css';
import Score from './Score';

export default function Game(props){
    let player=''
    let cpu=''
    let winPlayer=''
    let winCpu=''
    let [yourScore, setYourScore] = useState(0);
    let [tieScore, setTieScore] = useState(0);
    let [pcScore, setPcScore] = useState(0);

    if(props.player=='x'){
        player='<img className="cross_img" src="/cross.png">'
        cpu='/circle.png'
        winPlayer='/cross.png'
        winCpu='/circle.png'
    }
    else{
        player='<img className="cross_img" src="/circle.png">'
        cpu='/cross.png'
        winPlayer='/circle.png'
        winCpu='/cross.png'
    }

    let myArray = [0,1,2,3,4,5,6,7,8];
    let data=["","","","","","","","",""];
    let[lock,setLock]=useState(false);

    const toggle=(e,num)=>{
        let winFlag

        if(lock){
            return 0;
        }
        if(myArray.includes(num)){
            e.target.innerHTML=player
            data[num]='x'
            let index = myArray.indexOf(num);
            myArray.splice(index, 1);
            winFlag=checkWin(winPlayer);

            var turnImg = document.getElementById('turn_img');
            if (turnImg.textContent === 'x') {
                turnImg.textContent = 'o';
            } else {
            turnImg.textContent = 'x';
            }
            if(winFlag){
                setYourScore(yourScore++);
                return 0;
            }
            if(myArray.length==0){
                setLock(true);
                setTieScore(tieScore++);
                console.log("tie");
            }   
        }else{
            return 0;
        }

        setTimeout(()=>{
            if(myArray.length>0){
                let randomElement = myArray[Math.floor(Math.random() * myArray.length)];

                let insertAtDiv=document.getElementById('box'+randomElement)
                let image = document.createElement('img');
                image.src=cpu;
                insertAtDiv.appendChild(image);
                data[randomElement]='o'
        
                let index = myArray.indexOf(randomElement);
                myArray.splice(index,1)
                winFlag=checkWin(winCpu); 

                if(winFlag){
                    setPcScore(pcScore++);
                }

                if (turnImg.textContent === 'x') {
                    turnImg.textContent = 'o';
                } else {
                turnImg.textContent = 'x';
                }
            }        
        },400);
    }

    function checkWin(a){
        let win=true;
        if(data[0]===data[1] && data[1]==data[2] && data[2]!==""){
            won(a)
        }
        else if(data[3]===data[4] && data[4]==data[5] && data[5]!==""){
            won(a)
        }
        else if(data[6]===data[7] && data[7]==data[8] && data[8]!==""){
            won(a)
        }
        else if(data[0]===data[3] && data[3]==data[6] && data[6]!==""){
            won(a)
        }
        else if(data[1]===data[4] && data[4]==data[7] && data[7]!==""){
            won(a)
        }
        else if(data[2]===data[5] && data[5]==data[8] && data[8]!==""){
            won(a)
        }
        else if(data[0]===data[4] && data[4]==data[8] && data[8]!==""){
            won(a)
        }
        else if(data[6]===data[4] && data[4]==data[2] && data[2]!==""){
            won(a)
        }
        else{
            win=false;
        }
        return win;
    }

    function won(winner){
        setLock(true);
        console.log("you win");
        let screen=document.getElementById("overlap");  
        let winMsg=document.getElementById("win_dialogbox")
        
        let winImgId=document.getElementById('win_img')
        let winImage = document.createElement('img');
        winImage.src=winner
        winImgId.appendChild(winImage);

        screen.style.display="block";
        winMsg.style.display="flex";
        
    }

    function refreshBtn(){
        let ref=document.getElementById("quit_dialogbox")
        ref.style.display="flex";
    }
    function quit(){
        props.setGameScreenVisible(false)
    }

    function nextRound(){
        let screen=document.getElementById("overlap");  
        let winMsg=document.getElementById("win_dialogbox")

        screen.style.display="none";
        winMsg.style.display="none";

        let clear=document.querySelectorAll(".boxes")
        clear.forEach((element)=>{
            element.innerHTML=''
        })
        myArray = [0,1,2,3,4,5,6,7,8];
        
        let winImgId=document.getElementById('win_img')
        winImgId.innerHTML=''
        let ref=document.getElementById("quit_dialogbox")
        ref.style.display="none";

        setLock(false);
    }

    return(
        <>
                        
            <div className='screen' id="game_screen">
                <div className='img1'>
                    <img className="x_img" src="/x.png"/>
                    <img className="o_img" src="/o.png"/>
                </div>
                <div id='turn'>
                    <span id='turn_img'>{props.player}</span>
                    <span>TURN</span>
                </div>
                <div className='refresh' id='ref' onClick={refreshBtn}>
                <img className="refresh_img" src="/refresh.png"/>
                </div>
                <div className='play_area'>
                    <div className='row1'>
                        <div className='boxes' id='box0' onClick={(e)=>{toggle(e,0)}}></div>
                        <div className='boxes' id='box1' onClick={(e)=>{toggle(e,1)}}></div>
                        <div className='boxes' id='box2' onClick={(e)=>{toggle(e,2)}}></div>
                    </div>
                    <div className='row2'>
                        <div className='boxes' id='box3' onClick={(e)=>{toggle(e,3)}}></div>
                        <div className='boxes' id='box4' onClick={(e)=>{toggle(e,4)}}></div>
                        <div className='boxes' id='box5' onClick={(e)=>{toggle(e,5)}}></div>
                    </div>
                    <div className='row3'>
                        <div className='boxes' id='box6' onClick={(e)=>{toggle(e,6)}}></div>
                        <div className='boxes' id='box7' onClick={(e)=>{toggle(e,7)}}></div>
                        <div className='boxes' id='box8' onClick={(e)=>{toggle(e,8)}}></div>
                    </div>                    
                </div>

                <Score yourScore={yourScore} tieScore={tieScore} pcScore={pcScore} />

                <div id='overlap'></div>
                <div id='win_dialogbox'>
                    <div className='won_msg'>YOU WON!</div>
                    <div className='win_img_msg'>
                        <div id='win_img'></div>
                        <div className='who_win_msg'>TAKES THE ROUND</div>
                    </div>
                    <div className='buttons'>
                        <button id='quit_btn' onClick={quit}>QUIT</button>
                        <button id='next_btn'onClick={nextRound}>NEXT ROUND</button>
                    </div>
                </div>
                <div id='quit_dialogbox'>
                    <div className='quit_msg'>Do you want to quit ?</div>
                    <div className='buttons'>
                        <button id='play_btn' onClick={nextRound}>PLAY AGAIN</button>
                        <button id='quit_btnn'onClick={quit}>QUIT</button>
                    </div>
                </div>                
            </div>
        </>
    )
}