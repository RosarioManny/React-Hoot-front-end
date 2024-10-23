import { Link } from 'react-router-dom'


const HootList = () => {


    return (
        <>
        <Link key={hoot._id} to={`/hoots/${hoot._id}`}></Link>
        </>
    )
} 