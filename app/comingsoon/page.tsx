"use client"

import React from 'react'

import Image from 'next/image'
import { useRouter, } from "next/navigation";
import { Watch } from "react-loader-spinner";
import back from '@/public/back.png'
import commingsoon from '@/public/workin.png'
import logo from "@/public/hg.png"

function Coming() {
    const router = useRouter();

    const backPage = () => {
        router.replace('/login')
    };

    return (
        <div>
            <div className="absolute left-8 top-6 h-16 w-16 z-0 ">
                <Image
                    priority
                    src={back}
                    alt="back"
                    height={25}
                    onClick={backPage}
                />
            </div>
            <div className='bg-[#F15D4F]  flex flex-row p-3 '>

                <div className='ml-16 basis-1/5'>
                    <Image
                        priority
                        src={logo}

                        alt="logo"
                        width={55}
                        height={50} />

                </div>
                <div className='text-2xl text-[#ffffff]  basis-4/4 mt-3' >ฮุกกะ เมดิคอล เซอร์วิส</div>

            </div>
            <div className="flex flex-row justify-center items-center w-full mt-20">
                <Image
                    priority
                    src={commingsoon}
                    alt="commingsoon"
                    height={200}

                    onClick={backPage}
                />
                {/* <Watch
                    visible={true}
                    height="80"
                    width="80"
                    radius="48"
                    color="#4fa94d"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                /> */}

            </div>
            {/* <div className="mt-10 content-center font-semibold text-[#707070] text-center text-4xl p-5">

               <p className='font-mono italic font-bold uppercase '>Coming Soon..</p> 
     
            </div> */}


        </div>

    )
}

export default Coming