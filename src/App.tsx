
import BouncyAttractor from './components/elements/BouncyAttractor';
import FloatingCharacterContainer from './components/layout/FloatingCharacterContainer'





function App() {

    return (
        <div className="app w-full relative"  >
            <FloatingCharacterContainer />
            <div className='bg-[#141414] relative text-gray-50 p-20 text-2xl *:mb-4 h-screen'>
                <div className='text-9xl font-bold flex justify-center items-center'>Bouncy Attractor</div>
                <hr className='p-5'></hr>
                <div className='flex flex-col'>
                    <div className='flex justify-between mb-10'>
                        <BouncyAttractor child={<div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-10 h-40 rounded-full bg-stone-100"></div>}/>
                        <BouncyAttractor child={<div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-10 h-40 rounded-full bg-stone-100"></div>}/>
                        <BouncyAttractor child={<div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-10 h-40 rounded-full bg-stone-100"></div>}/>
                        <BouncyAttractor child={<div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-10 h-40 rounded-full bg-stone-100"></div>}/>
                        <BouncyAttractor child={<div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-10 h-40 rounded-full bg-stone-100"></div>}/>
                        <BouncyAttractor child={<div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-10 h-40 rounded-full bg-stone-100"></div>}/>
                        <BouncyAttractor child={<div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-10 h-40 rounded-full bg-stone-100"></div>}/>
                        <BouncyAttractor child={<div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-10 h-40 rounded-full bg-stone-100"></div>}/>
                        <BouncyAttractor child={<div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-10 h-40 rounded-full bg-stone-100"></div>}/>
                        <BouncyAttractor child={<div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-10 h-40 rounded-full bg-stone-100"></div>}/>
                        <BouncyAttractor child={<div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-10 h-40 rounded-full bg-stone-100"></div>}/>
                        <BouncyAttractor child={<div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-10 h-40 rounded-full bg-stone-100"></div>}/>
                        <BouncyAttractor child={<div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-10 h-40 rounded-full bg-stone-100"></div>}/>
                        <BouncyAttractor child={<div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-10 h-40 rounded-full bg-stone-100"></div>}/>
                    </div>
                    <div className='grid grid-cols-3'>
                        <div className='flex items-center justify-center'><BouncyAttractor /></div>
                        <div className='flex items-center justify-center'><BouncyAttractor /></div>
                        <div className='flex items-center justify-center'><BouncyAttractor /></div>
                        <div className='flex items-center justify-center'><BouncyAttractor /></div>
                        <div className='flex items-center justify-center'><BouncyAttractor /></div>
                        <div className='flex items-center justify-center'><BouncyAttractor /></div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default App
