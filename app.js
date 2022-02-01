#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';

import {createSpinner} from "nanospinner"


let playerName;

const sleep=(ms=2000)=>new Promise((r)=>setTimeout(r,ms))


const welcome=async()=>{
    const rainbowTitle=chalkAnimation.rainbow("who wants to be a millionare? \n")
    await sleep()
    rainbowTitle.stop()

    console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    im a processs on your computer. 
    if you get any questions wrong i will be ${chalk.bgRed("killed")}
    so get all the questions right...
    `);
}
// await welcome()

const askName=async()=>{
    const answers=await inquirer.prompt({
        name:"player_name",
        type:"input",
        message:"whats your name",
        default(){
            return "player"
        }
    })
    playerName=answers.player_name
}

const question1=async()=>{
    const answers=await inquirer.prompt({
        name:"question1",
        type:"list",
        message:"js was created in 10 days then released on \n",
        choices: [
            "may 23rd,1995",
            "nov 24th,1995",
            "dec 4th,1995",
            "dec 17th,1996",
        ]
    }) 
    return handleAnswers(answers.question1=="dec 4th,1995")
}

const handleAnswers=async(isCorrect)=>{
    const spinner=createSpinner("checking the answer...").start()
    await sleep()

    if (isCorrect){
        spinner.success({text:`nice work ${playerName}`})
    }else{
        spinner.error({text:`💀💀💀 game over you lose ${playerName}`})
        process.exit(1)
    }
}



const winner=()=>{
    console.clear()
    const msg=`Congrats,${playerName} you won \n $ 1,0 0 0 ,0 0 0`

    figlet(msg,(err,data)=>{
        console.log(gradient.pastel.multiline(data));
    })
}

await welcome()
await askName()
await question1()
await winner()