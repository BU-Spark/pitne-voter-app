import ButtonFill from "@/components/button/ButtonFill"

export default function BallotInfo() {
    return (
        <div className=''>

            <div className='flex flex-col justify-center items-center p-4 text-center mb-10'>
                <h1 className='text-blue-700 font-bold text-6xl '>Ballot Info</h1>
            </div>

            <div className="flex justify-center">
                <div className="flex flex-col items-start text-left">
                    <h1 className="font-bold text-3xl">LEARN. PLAN.</h1>
                    <h1 className="font-semibold text-xl mt-2">Explore the elections, candidates, and crucial issues personalized to your community.</h1>

                    <div className='w-full '>
                        <h1 className="font-semibold text-xl mt-4">Address</h1>
                        <p className="text-lg mt-4 p-5 bg-blue-100  rounded-full"> 500 Cherokee RD <br /> Boston MA, 02215</p>
                        <ButtonFill name='Change Address' link='/changeAddress' className='p-4 mt-4 rounded-full bg-blue-700 text-white' />
                    </div>
                </div>
            </div>

            <div>
                <h1 className="font-semibold text-xl mt-4">Upcoming Elections</h1>
                <p className="text-lg mt-4 p-5 bg-blue-100 rounded-full"> November 2, 2021</p>
            </div>


        </div>
    )
}