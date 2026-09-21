
import BouncyAttractor from './components/elements/BouncyAttractor';
import FloatingCharacterContainer from './components/layout/FloatingCharacterContainer';
import InkDropButton from './components/elements/InkDropButton';
import SmoothScroll from './behaviors/SmoothScroll';

SmoothScroll();

function App() {

    return (
        <div className="app w-full relative"  >
            <FloatingCharacterContainer />


            {/* Bouncy Attractor Section */}
            <section className='bg-[#141414] relative text-gray-50 p-20 text-2xl *:mb-4 h-screen'>
                <div className='text-9xl font-bold flex justify-center items-center'>Bouncy Attractor</div>
                <hr className='p-5'></hr>
                <div className='flex flex-col'>
                    <div className='flex justify-between mb-10'>
                        {
                        Array.from({ length : 14 }).map((_, index) => (
                        <BouncyAttractor key={index}>
                            <div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-10 h-40 rounded-full bg-stone-100" />
                        </BouncyAttractor>
                        ))
                        }
                    </div>
                    <div className='grid grid-cols-3'>
                        {
                        Array.from({ length : 6 }).map((_, index) => (
                        <div
                            key={index}
                            className='flex items-center justify-center'
                            >
                            <BouncyAttractor>
                                <div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-60 h-60 rounded-full bg-stone-100 text-[#141414] font-semibold" />
                            </BouncyAttractor>
                        </div>
                        ))}
                    </div>
                </div>
            </section>





            {/* InkDrop Button Section */}
            <InkDropButton borderRadius='0' color='none' hoverColor='#F0EEE999'>
                <div className='relative cursor-default backdrop-blur-2xl h-screen w-full text-gray-200 hover:text-gray-900 *:duration-200 *:ease-in-out'>
                    <div className='text-9xl p-8 w-full font-bold flex justify-center items-center'>Ink Drop Button</div>
                    <hr className='p-5 ml-20 mr-20'></hr>
                    <div className='flex flex-col items-center *:mb-10'>
                    
                        <div className='grid grid-cols-3 gap-10 w-300 justify-between *:flex *:justify-center *:items-center'>
                            {/* Top Button Row */}
                            <BouncyAttractor><InkDropButton color='#C7C5C1' hoverColor='#141414'><div className="w-25 h-25 rounded-full"></div></InkDropButton></BouncyAttractor>
                            <div>
                                <InkDropButton color='#ADA8A3' hoverColor='#B124D1' origin='top'>
                                    <div className="flex text-2xl font-black text-[#e292f1] hover:text-[#4a0a58] duration-200 ease-in-out w-50 h-50 justify-center items-center rounded-full">
                                        TOP
                                    </div>
                                </InkDropButton>
                            </div>
                            <BouncyAttractor><InkDropButton color='#C7C5C1' hoverColor='#141414'><div className="w-25 h-25 rounded-full"></div></InkDropButton></BouncyAttractor>

                            {/* Middle Button Row */}
                            <div>
                                <InkDropButton origin="left" color='#ADA8A3' hoverColor='#24ADD1'>
                                    <div className="flex text-2xl font-black text-[#85c7da] hover:text-[#084b5c] duration-200 ease-in-out w-50 h-50 justify-center items-center rounded-full">
                                        LEFT
                                    </div>
                                </InkDropButton>
                            </div>
                            <div>
                                <InkDropButton origin='center' color='#C7C5C1' hoverColor='#141414'>
                                    <div className="flex text-2xl font-black text-[#141414] hover:text-[#C7C5C1] duration-200 ease-in-out w-50 h-50 justify-center items-center rounded-full">
                                        CENTER
                                    </div>
                                </InkDropButton>
                            </div>
                            <div>
                                <InkDropButton origin='right' color='#ADA8A3' hoverColor='#D17823'>
                                    <div className="flex text-2xl font-black text-[#e7aa72] hover:text-[#552e0b] duration-200 ease-in-out w-50 h-50 justify-center items-center rounded-full">
                                        RIGHT
                                    </div>
                                </InkDropButton>
                            </div>



                            {/* Bottom Button Row */}
                            <BouncyAttractor><InkDropButton color='#C7C5C1' hoverColor='#141414'><div className="w-25 h-25 rounded-full"></div></InkDropButton></BouncyAttractor>
                            <div>
                                <InkDropButton origin='bottom' color='#ADA8A3' hoverColor='#8AD124'>
                                    <div className="flex text-2xl font-black text-[#c5eb91] hover:text-[#30580c] duration-200 ease-in-out w-50 h-50 justify-center items-center rounded-full">
                                        BOTTOM
                                    </div>
                                </InkDropButton>
                            </div>
                            <BouncyAttractor><InkDropButton color='#C7C5C1' hoverColor='#141414'><div className="w-25 h-25 rounded-full"></div></InkDropButton></BouncyAttractor>
                        </div>

                    </div>
                </div>
            </InkDropButton>
        </div>
    )

}

export default App
