import React, {useState,useEffect} from 'react'
import axios from 'axios'

export default function  useGetAlexaResponse(URL_PATH) {
    const [data,setData]=useState('')
      
    const fetchExpression= async ({expression})=>{   
        console.log(expression,"expressionResultexpressionResult")
        const response=await axios.post(URL_PATH,{
            "intent_request": {
                "type": "IntentRequest",
                "intent": {
                    "name": `${expression}`
                }
            }
        })
        setData(response)
    }
    return {
        data,
        fetchExpression
    }
   
}