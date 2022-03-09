/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from 'react';
import useAxiosTokenAPI from "../../hook/useAxiosTokenAPI"

export default function BatteTurnBase() {

  const [isBattle, setIsBattle] = useState(false);
  const [entities, setEntities] = useState([]);
  const [isFinishBattle, setIsFinishBattle ] = useState(false);


  const [axiosJWT, isLoading] = useAxiosTokenAPI();

  useEffect(()=>{
    //console.log("isLoading: ", isLoading)
    if((typeof axiosJWT?.instance=="function")&&(isLoading == false)){
      console.log("GETTING...: ")
      queryCheckBattle();
    }
  },[axiosJWT,isLoading])

  async function queryCheckBattle(){

    axiosJWT.instance.get('/api/battle/battleturn')
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log('Fetch Error GET battle');
          return;
        }
        if((data.action=="UPDATE") || (data.action=="CREATED")){
          //let battlefield = JSON.parse(data.battlefield);
          let battlefield = data.battlefield;
          console.log(battlefield);
    
          //battlefield.ally[0]
          let objs = [];
          objs.push(battlefield.foe[0]);
          objs.push(battlefield.ally[0]);
          
          setEntities(objs);
          setIsBattle(true);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //need to fixed this later
  async function randomBattle(){
    console.log("random Battle...");

    axiosJWT.instance.post('/api/battle/battleturn',{
        action:'RANDOMBATTLE'
      , type:'normal' //weapon attack
    })
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log('Fetch Error post battle');
          return;
        }
        if((data.action=="FOUND") || (data.action=="CREATED")){
          let battlefield = data.battlefield;
          console.log("battlefield>>>>>>>>>>>>>");
          console.log(battlefield);
          let objs = [];
          objs.push(battlefield.foe[0]);
          objs.push(battlefield.ally[0]);
          setEntities(objs);
          setIsBattle(true);
          setIsFinishBattle(false);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async function playerAttack(){

    axiosJWT.instance.post('/api/battle/battleturn',{
        action:'BATTLE'
      , type:'normal' //weapon attack
    })
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log('Fetch Error post battle');
          return;
        }
        //server cal battle
        if(data.action=="UPDATE"){
          let battlefield = data.battlefield;
          console.log(battlefield);
          battlefield.ally[0]
          let objs = [];
          objs.push(battlefield.foe[0]);
          objs.push(battlefield.ally[0]);
          setEntities(objs);
        }

        if(data.action=="NOBATTLE"){
          //clear battle data
          setEntities([]);
          setIsBattle(false)
        }

        if(data.action=="BATTLEFINISH"){
          //clear battle data
          setEntities([]);
          setIsBattle(false);

          setIsFinishBattle(true);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  return (<>
    <div>
      {(!isBattle) && <button onClick={()=>randomBattle()}>Random Battle</button>}

      {(isBattle) &&(
        <>
          <label>FOUND BATTLE:</label>
          <button onClick={playerAttack}>Action Attack</button>
          {entities.map((item)=>{
            return (
              <div key={item.id}>
                <label>Name: {item.name} </label>
                <br />
                <label>Health: {item.healthpoint} / {item.healthpointmax} </label>
                <br />
              </div>
            )
          })}
        </>
      )}
      {(isFinishBattle)&&(
        <>
          <label>Finish Battle</label>
        </>
      )}
    </div>
  </>);
}