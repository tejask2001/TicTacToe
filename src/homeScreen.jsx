import './homeScreen.css'
import { useState } from 'react'
import Game from './game';

export default function HomeScreen(){
    const [isGameScreenVisible, setGameScreenVisible] = useState(false);
    
    const [selectedPlayer,setSelectedPlayer]=useState('o');

    const showGameScreen = () => {
      setGameScreenVisible(true);
      let inv_toast=document.getElementById('invite_msg');
      inv_toast.style.display='none';
    };

    function toggleX() {
        let changeColorX = document.getElementById('choose_x');
        changeColorX.style.backgroundColor = "#D9D9D9";
        changeColorX.style.color="#192A32";

        let changeColorO = document.getElementById('choose_o');
        changeColorO.style.backgroundColor = "#192A32";
        changeColorO.style.color="#D9D9D9";

        setSelectedPlayer('x');
      }   
    function toggleO() {
        let changeColorO = document.getElementById('choose_o');
        changeColorO.style.backgroundColor = "#D9D9D9";
        changeColorO.style.color="#192A32";

        let changeColorX = document.getElementById('choose_x');
        changeColorX.style.backgroundColor = "#192A32";
        changeColorX.style.color="#D9D9D9";
    }    

    function inviteToast(){
        let inv_toast=document.getElementById('invite_msg');
        inv_toast.style.display='flex';
    }

    return(
        <>
            <div id='invite_msg'>Invite link copied</div>
            <div className="home_screen">
                <div className='img'>
                    <img className="cross_img" src="/x.png"/>
                    <img className="circle_img" src="/o.png"/>
                </div>
                <div className='pick_player'>
                    <div className='pick_player_img'>PICK PLAYER</div>
                    <div className='choice_btn'>
                        <div id='choose_x' onClick={toggleX}><h1>x</h1></div>
                        <div id='choose_o' onClick={toggleO}><h1>o</h1></div>
                    </div>                    
                </div>
                <div className='vs_cpu_btn' onClick={showGameScreen}>NEW GAME ( VS CPU )</div>
                <div className='vs_human_btn'>NEW GAME ( VS HUMAN ) Coming soon</div>
                <div className='invite' onClick={inviteToast}>Invite your friend</div>
            </div>
            {isGameScreenVisible && <Game player={selectedPlayer} setGameScreenVisible={setGameScreenVisible}/>}
        </>
    )
}