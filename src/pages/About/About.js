import { useTheme } from '../../App';
import { localized } from '../../hooks/useLocalization';
import './About.css';

const About = () => {
    const aboutPageClassName = useTheme('about-page');

    return (
        <div className={ aboutPageClassName }>
            <h1 className='title'>{ localized('about.title') }</h1>

            <ul className='about'>
                <li><strong>Nápad: </strong>pani učiteľka Draganová¡</li>
                <li><strong>Názov: </strong>Adventná¡ výzva<br /></li>
                <li><strong>Charakteristika: </strong>Hlavnou prioritou projektu Adventná výzva je duchovne Vás pripraviť na blížiace sa Vianoce v období Adventu.
                    Výzva spočíva v každodennom plnení jednotlivých úloh, ktoré vám prinesú nielen veľa nových vedomostí, ale aj veľa zábavy.
                    Jednotlivé úlohy sú vytvorené tak, aby zaujali všetky deti a žiakov srôznymi záujmami.</li>
                <li><strong>Využitie: </strong>Projekt Adventná výzva je určený najmä pre ambicióznych žiakov s odhodlaním
                    plniť úlohy. Otestujú si nielen svoje vedomosti a logické myslenie, ale aj schopnosť  tvorenia si vlastného time-managementu.  </li>
                <li><strong>Dátum spustenia: </strong>1. December 2021</li>

                <li> <strong>Manažéri projektu: </strong></li>
                <ol>
                    <li>Veronika Kubicová</li>
                <ul><strong>Kontakt: </strong>veronikakubicova.80@gmail.com</ul>

                <li>Slávka Košecká </li>
                <ul><strong>Kontakt: </strong>slavka.kosecka@gmail.com</ul> </ol><br />

                <li><strong>Tvorca: </strong>Andrea Draganová<br /></li>
                <ul>
                    <li>
                        Pani učiteľka pochádzajca z Oravy ale momentálne pôsobý na škole v Petržalke.
                        Jej ambíciou bolo vytvoriť stránku, ktorá užívateľov nielen zaujme, ale ich
                        aj výborne pripraví na blížiace sa Vianoce.
                    </li>
                    <li><strong>Kontakt: </strong>andrea.draganova@svr.sk</li>
                </ul>

                <li><strong>Dátum: </strong>1. December 2021<br /></li>
                <li><strong>Organizácia: </strong><br /></li>

                <li><strong>Developeri: </strong><br /></li>
                <ol>
                    <strong><li>Daniel Svitaň</li></strong>
                    <ul>
                        <li>Viedol a poháňal celý tím. Svoje úlohy plnil precízne a vždy načas.
                            Jeho silnou stránkou je predovšetkým vytrvalosť a odhodlanosť.
                            Málokto by venoval tvorbe stránky tak veľa času ako on.
                        </li>
                        <li><strong>Kontakt: </strong>daniel.svitan.team7274dev@gmail.com</li>
                    </ul>

                    <strong><li>Jakub Tulek</li></strong>
                    Je skvelý tímový hráč a rýchlo sa učí nové veci. Je jazykovo zdatný,
                    a tak sa venoval aj prekladu stránky. Prioritne sa zaslúžil
                    o tvorbu samotného srdca celej stránky – servera.
                    <ul><strong>Kontakt: </strong>jtulek@at-rt.com</ul><br />

                    <strong><li>Jakub Porubec</li></strong>
                    Je veľmi tvorivý a má dobrú predstavivosť.
                    Rád tvorí indie hry a tvorbu grafiky má v malíčku.
                    Venuje sa najmä pixel-art a 3D grafike.
                    <ul><strong>Kontakt: </strong>zmakamk@gmail.com</ul><br />

                    <strong><li>Richard Sepši</li></strong>
                    V počítačovom svete a vo svete hier je ako doma.
                    Tiež ho bavia cudzie jazyky a rád sa ich učí.
                    Takisto je aj zručný grafik s estetickým
                    ako aj počítačový hráč, a tak rozhodoval predovšetkým o vzhľade stránky.
                    <ul><strong>Kontakt: </strong>rihvis@gmail.com</ul><br />

                    <strong><li>Ivan Hrabčák</li></strong>
                    <ul><strong>Kontakt: </strong>ivan@hrabcak.eu</ul><br />
                </ol>

                <li><strong>Mesto, krajina: </strong>Bratislava, Slovensko</li>
                <li><strong>Ďaľšie projeky: </strong>
                    <ul>
                        <li>RNG</li>
                    </ul>
                </li>

                <li><h4>IT</h4></li>
                <li>
                    <ul>
                        <li><strong>Jazyky: </strong>JavaScript, Kotlin</li>
                        <li><strong>Frameworky: </strong>Springboot, React</li>
                        <li><strong>Zdrojové kódy: </strong>https://github.com/7274-dev/AdventnaVyzva-React, https://github.com/7274-dev/AdventnaVyzva-GlobalBackend/</li>
                        <li><strong>API dokumentácia: </strong>https://github.com/7274-dev/AdventnaVyzva-GlobalBackend/wiki/Docs</li>
                    </ul>
                </li>

                <li><h4>Licencia: <strong>MIT</strong></h4></li>
            </ul>
        </div>
    )
}

export { About }
