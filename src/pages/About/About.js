import { useTheme } from '../../App';
import { useResponsiveValue } from '../../hooks/useResponsiveValue';
import { BackToHomePageButton } from '../../components';
import { localized } from '../../hooks/useLocalization';
import './About.css';

const About = () => {
    const isMobile = useResponsiveValue(false, true);
    const aboutPageClassName = useTheme('about-page');

    return (
        <div className={ aboutPageClassName }>
            <h1 className='title'>{ localized('about.title') }</h1>

            <ul className='about'>
                <li><strong>Nápad: </strong>pani učiteľka Draganová¡</li>
                <li><strong>Názov: </strong>Adventná¡ výzva<br /></li>
                <li>
                    <strong>Charakteristika: </strong>
                    Adventná výzva predstavuje online priestor, v ktorom sa učitelia môžu podieľať na duchovnej
                    príprave svojich žiakov na blížiace sa Vianoce. Pomocou širokej ponuky nástrojov môžu učitelia
                    vytvárať úlohy rôzneho typu. Stránka je navrhnutá tak, aby práca s ňou bola čo najjednoduchšia
                    a najefektívnejšia.
                </li>
                <li>
                    <strong>Využitie: </strong>
                    Pri plnení úloh majú žiaci možnosť precvičiť si nielen svoje vedomostné a logické dispozície,
                    ale vedieť si vytvoriť aj svoj vlastný time-management. Je len na vás, milí učitelia, do akej
                    miery pripravíte svojich žiakov na najkrajšie obdobie v roku.  Tak do toho!
                </li>
                <li>
                    <strong>Dátum spustenia: </strong>
                    1. December 2021
                </li>

                <li><strong>Manažéri projektu: </strong></li>
                <ol style={{padding: '0 0 0 1.5rem'}}>
                    <li>
                        <ul style={{padding: '0'}}>
                            <li>Veronika Kubicová</li>
                            <li><strong>Kontakt: </strong>veronikakubicova.80@gmail.com</li>
                        </ul>
                    </li>

                    <li>
                        <ul style={{padding: '0'}}>
                            <li>Slávka Košecká </li>
                            <li><strong>Kontakt: </strong>slavka.kosecka@gmail.com</li>
                        </ul>
                    </li>
                </ol><br />

                <li><strong>Tvorca: </strong>Andrea Draganová<br /></li>
                <ul>
                    <li>
                        Rada číta knihy, chodí do divadla, počúva podcasty a vedie dlhé rozhovory na všakovaké témy.
                        Najväčšiu radosť jej robí, keď môže oveciach premýšľať do hĺbky, keď veci dávajú zmysel.
                        naží sa inšpirovať žiakov k tomu, aby v sebe našli talenty a rozvíjali ich.
                    </li>
                    <li><strong>Kontakt: </strong>andrea.draganova@svr.sk</li>
                </ul>

                <li><strong>Dátum: </strong>1. December 2021<br /></li>
                <li><strong>Organizácia: </strong><br /></li>

                <li><strong>Developeri: </strong><br /></li>
                <ol>
                    <li><strong>Daniel Svitaň</strong></li>
                    <ul>
                        <li>
                            Viedol a poháňal celý tím. Jeho silnou stránkou je predovšetkým vytrvalosť
                            a odhodlanosť. Málokto by venoval tvorbe stránky tak veľa času ako on.
                        </li>
                        <li><strong>Kontakt: </strong>daniel.svitan.team7274dev@gmail.com</li>
                    </ul>

                    <li><strong>Jakub Tulek</strong></li>
                    <ul>
                        <li>
                            Je skvelý tímový hráč a rýchlo sa učí nové veci. Je jazykovo zdatný,
                            a preto sa venoval aj prekladu stránky. Prioritne sa zaslúžil
                            o tvorbu samotného srdca celej stránky – servera.
                        </li>
                        <li><strong>Kontakt: </strong>jtulek@at-rt.com</li><br />
                    </ul>

                    <li><strong>Jakub Porubec</strong></li>
                    <ul>
                        <li>
                            Je veľmi tvorivý a má dobrú predstavivosť.
                            Rád tvorí indie hry a tvorbu grafiky má v malíčku.
                            Venuje sa najmä pixel-art a 3D grafike.
                        </li>
                        <li><strong>Kontakt: </strong>zmakamk@gmail.com</li><br />
                    </ul>

                    <li><strong>Richard Sepši</strong></li>
                    <ul>
                        <li>
                            V počítačovom svete a vo svete hier je ako doma. Tiež ho bavia cudzie jazyky
                            a rád sa ich učí. Takisto je aj zručný grafik s estetickým cítením, a tak rozhodoval
                            predovšetkým o vzhľade stránky.
                        </li>
                        <li><strong>Kontakt: </strong>rihvis@gmail.com<br /></li>
                    </ul>

                    <li><strong>Ivan Hrabčák</strong></li>
                    <ul>
                        <li>
                            Jeho silnou stránkou je matematika, ktorú má veľmi rád. Vo svojom voľnom čase sa venuje
                            skautingu a tiež, ako pravý skaut, rád hrá na gitare. Zaslúžil sa o tvorbu stránky a jej
                            servera.
                        </li>
                        <li><strong>Kontakt: </strong>ivan@hrabcak.eu</li><br />
                    </ul>
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

            <BackToHomePageButton positionRelative={ isMobile } />
        </div>
    )
}

export { About }
