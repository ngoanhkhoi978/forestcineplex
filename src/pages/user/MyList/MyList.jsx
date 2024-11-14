function MyList() {
    return (
        <div className="container mx-auto h-screen pt-header">
            <h1 className="text-3xl font-bold text-green-700">Đây là trang My list</h1>
            <video width="full" height="full" autoPlay={true} loop={true}>
                <source src="http://192.168.2.103:3000/api/movies/trailer" type="video/mp4" />
            </video>
        </div>
    );
}

export default MyList;
