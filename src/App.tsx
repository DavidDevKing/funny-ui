
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
            </div>
        </div>
    )

}

export default App
