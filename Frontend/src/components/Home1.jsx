import React from 'react'


const Home1 = () => {
    return (
        <div style={{ backgroundColor: '#3a3a3a' }} className='text-white'>
            <div className='flex'>
                <ul className="w-[170px] flex-col justify-start items-start gap-2 inline-flex pl-4 text-center mt-2">
                    <li>Woman’s Fashion</li>
                    <li>Men’s Fashion</li>
                    <li>Electronics</li>
                    <li>Home & Lifestyle</li>
                    <li>Medicine</li>
                    <li>Sports & Outdoor</li>
                    <li>Baby’s & Toys</li>
                    <li>Groceries & Pets</li>
                    <li>Health & Beauty</li>
                </ul>
                <div className="h-[290px] border-l-2 border-gray-300"></div>
                <div className="pl-[10px] mt-4 h-[313px] flex-col justify-start items-start gap-[20px] inline-flex">
                    <div className="self-stretch justify-start items-end gap-[850px] inline-flex">
                        <div className="flex-col justify-start items-start gap-5 inline-flex">
                            <div className="justify-start items-center gap-4 inline-flex">
                                <div className="w-5 h-10 relative">
                                    <div className="w-5 h-10 left-0 top-0 absolute bg-[#db4444] rounded" />
                                </div>
                                <div className="text-[#db4444] leading-tight">Categories</div>
                            </div>
                            <div className="text-white text-4xl font-semibold font-['Inter'] leading-[48px] tracking-wider">Browse By Category</div>
                        </div>
                        <div className="justify-start items-start gap-2 flex ">
                            <div className="w-[46px] h-[46px] relative ">
                                <div className="w-[46px] h-[46px] left-0 top-0 absolute bg-neutral-100 rounded-full" />
                                <div />
                            </div>
                            <div className="w-[46px] h-[46px] relative">
                                <div className="w-[46px] h-[46px] left-0 top-0 absolute bg-neutral-100 rounded-full" />
                            </div>
                        </div>
                    </div>
                    <div className="justify-start items-start gap-[30px] inline-flex">
                        <div className="w-[170px] h-[145px] pr-14 pt-[25px] pb-6 rounded border border-white flex-col justify-center items-end gap-4 inline-flex">
                            <div className="w-14 h-14 relative flex-col justify-start items-start flex">
                                <img src="/icons/Phone.svg" alt="Phone Icon" />
                            </div>
                            <div>Phones</div>
                        </div>
                        <div className="w-[170px] h-[145px] pr-14 pt-[25px] pb-6 rounded border border-white flex-col justify-center items-end gap-4 inline-flex">
                            <div className="w-14 h-14 relative flex-col justify-start items-start flex">
                                <img src="/icons/Computer.svg" alt="Computer Icon" />
                            </div>
                            <div>Computers</div>
                        </div>
                        <div className="w-[170px] h-[145px] pr-14 pt-[25px] pb-6 rounded border border-white flex-col justify-center items-end gap-4 inline-flex">
                            <div className="w-14 h-14 relative flex-col justify-start items-start flex">
                                <img src="/icons/Camera.svg" alt="Camera Icon" />
                            </div>
                            <div>Camera</div>
                        </div>
                        <div className="w-[170px] h-[145px] pr-14 pt-[25px] pb-6 rounded border border-white flex-col justify-center items-end gap-4 inline-flex">
                            <div className="w-14 h-14 relative flex-col justify-start items-start flex">
                                <img src="/icons/Headphone.svg" alt="Headphone Icon" />
                            </div>
                            <div>Headphone</div>
                        </div>
                        <div className="w-[170px] h-[145px] pr-14 pt-[25px] pb-6 rounded border border-white flex-col justify-center items-end gap-4 inline-flex">
                            <div className="w-14 h-14 relative flex-col justify-start items-start flex">
                                <img src="/icons/Gamepad.svg" alt="Gamepad Icon" />
                            </div>
                            <div>Gamepad</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
            )
}
export default Home1
