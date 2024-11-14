import { useEffect } from 'react';

function News() {
    useEffect(() => {
        fetch('http://192.168.2.103:3000/api/users');
    }, []);
    return (
        <div className="container mx-auto pt-header">
            <h1 className="text-3xl font-bold text-green-700">Đây là trang News</h1>
        </div>
    );
}

export default News;
