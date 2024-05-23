const Admin = ({user}) => {
    return (
        <>  
            <div className="w-screen h-screen flex flex-col">
                <div className="greeting h-full w-full text-2xl flex items-center justify-center">Welcome {user.username}</div>
                <div className="h-full w-full flex items-center justify-center">
                    <div className="h-[200px] w-[200px] rounded-[50%] border m-5 text-center flex items-center justify-center cursor-pointer">Add User</div>
                    <div className="h-[200px] w-[200px] rounded-[50%] border m-5 text-center flex items-center justify-center cursor-pointer">Check Attendance</div>
                    <div className="h-[200px] w-[200px] rounded-[50%] border m-5 text-center flex items-center justify-center cursor-pointer">Mark Attendance</div>

                </div>
            </div>
        </>
    )
}

export default Admin