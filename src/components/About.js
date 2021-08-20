import { useTheme } from '../App';
import '../styles/About.css';

const About = () => {
    // TODO all: write some text about project here
    /* idea:
        project
            name
            description
            usage
            launch date
            developers
                contacts

            helpers (manager, designer...)
                contacts

        idea
            creator
                bio
                contact

            date

        organization
            name
            developers
                bio
                contacts

            country, city
            creator
            another big projects

        it stuff
            languages
            frameworks
            github source codes
            api docs
            deployment docs

        license
            copyright

    * */

    const aboutPageClassName = useTheme('about-page');

    return (
        <div className={ aboutPageClassName }>
            <h1>Advent Challenge</h1>
            {/* pinned on discord */}
            {/* TODO design: make text look prettier */}
        </div>
    )
}

export { About };
