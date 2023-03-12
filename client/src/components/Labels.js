import React from 'react'
import {default as api} from '../store/apiSlice'
import { getLabels } from '../helper/helper';


const Labels = () => {

   const {data,isFetching, isSuccess, isError} = api.useGetLabelsQuery();
//    console.log(data)
let Transaction;

if(isFetching){
    Transaction = <div>Loading</div>
}
else if(isSuccess){
    Transaction = getLabels(data,'type').map((v,i)=><LabelComponents key={i} data={v}/>)
}
else if(isError){
    Transaction = <div>Error</div>
}
  return (
    <>
        {Transaction}
    </>
  )
}

function LabelComponents({data}){
    if(!data) return <></>;
    return(
        <div className='labels flex justify-between'>
            <div className='flex gap-2'>
            <div className='w-2 h-2 rounded py-3' style={{backgroundColor: data.colour ?? "#f9c74f"}}></div>
                <h3 className='text-md'>{data.type ?? ''}</h3>
            </div>
            <h3 className='font-bold'>{Math.round(data.percent) ?? 0}%</h3>
        </div>
    )
}

export default Labels