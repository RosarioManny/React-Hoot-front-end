import {Link} from 'react-router-dom'

const HootList = (props) => {
    const { hoots } = props
    console.log(hoots)


    return (
        <main>
            {hoots.map((hoot) => (
                <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
                    <article>
                        <header>
                            <h2>{hoot.title}</h2>
                            <p>
                                {/* The Author field is not coming from the database for data that was created without a
                                user when testing. Shouldn't be a problem for Hoots created through frontend */}
                                Author: {hoot.author? hoot.author : "Anonymous"} posted on
                                Created Date: {new Date(hoot.createdAt).toLocaleDateString()}
                            </p>
                        </header>
                        <p>{hoot.text}</p>
                    </article>
                </Link>
            ))}
        </main>
    );
};

    export default HootList;