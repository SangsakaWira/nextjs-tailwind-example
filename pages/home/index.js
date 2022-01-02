import Navbar from "../components/Navbar";

export default function Home() {
    
    return (
        <>
            <Navbar current={"Home"}></Navbar>
            <div class="container mx-auto">
                {["Hari Ini", "Malam Minggu"].map(doc => {
                    return (
                        <div className="mt-6">
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 max-w-full mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 w-full">
                                <div>
                                    <div className="text-xl font-medium text-white">{doc}</div>
                                    <p className="text-white">You have a new message!</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <button className="w-full text-center mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Note</button>
            </div>
        </>
    )
}