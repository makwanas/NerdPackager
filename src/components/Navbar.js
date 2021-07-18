/** @jsxImportSource @emotion/react */

//JS file for temporary Navbar

//Importing dependencies
import { NavLink } from 'react-router-dom';
import { css } from '@emotion/react';

//Navbar Styles
const NavbarStyles = css`
display: flex;   
img{
        width:70px;
        height:70px;
    }
a{
    text-decoration: none;
}
`;

//Navbar DOM rendering
function Navbar() {
    return (
        <div css={NavbarStyles}>
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBUPEA8VFRUVFRYPFRUQFRUQFRUNFREWFxUVFRUYHSggGBolHRUVITIhJSkrLi4uGB8zODMsQygtLisBCgoKDQ0ODw8PFSsZFRkrLS0tLTcrNSstNysrKystKystLS0xLS03KzctKysrNysrKy0rLSsrKystKys3KysrLf/AABEIAOgA2QMBIgACEQEDEQH/xAAcAAEBAAIDAQEAAAAAAAAAAAAAAQYIAgUHBAP/xABGEAABAwIDBAUIBggEBwAAAAABAAIDBBEFEiEGBzFBE1FhcZEUFiIjMlWB0kJicoKSoQgzUlNzorHRFSSj8CY0Q1Rjg5P/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAERIB/9oADAMBAAIRAxEAPwD3AoECqAiiqAiIgKBVEBFFUBERAUAVRAREQERRxQVSyjVyQEREBERAUIVRAREQEREBRVRAuqpZVAREQFFVEH4RVbXENANyL69S+hfPDSNabgnTrt/ZfQgIiICISuBKCucgagauSAiIgIiIJdVSyqAiIgIiICKFAUBVEQEREBEUBQFURAREQERQFBHBUBVEBERARFL8kFREQEREEVRQlBVFUQRVEQEREBERBFURARFEFRFEBVEQERRBURRBUsiICIogqIogqWREEVRLICIiAhXFxVagBVFEFRFxkkDQXOIAALiSbANAuSTyCDksRxreThNMSx9UJHi4LacGYhw4gub6LT3kLAsTxqu2gq30NA8w0TP1khuM7CSA+S1iQ6xyxXFxcu+rnOzu7LC6QA+TieQW9ZUgS+kObWH0GfAX7UGOu3yxyX8iwypqDci3C3VfohIscxTfPiNyyOkhgcCWuEokle1w0IIJZYg8iF7kckbCbBrWgu0AADQLnRah1VSZZHzkayvfMftPcXkfzIravZLFTV0NPVG2aWJj324CXLZ4Hc4OC7Zebbh8S6TDn054wTOaP4UvrAfxOkHwXpKIL86idkbHSPcGta0vc5xsGsaLkk8gAF+i8o37bQuZFFhkJJfPaSQN9owh1mR/ff45COaDHsc25xDEZHQYV04AdYCBrukfBZ15ZJD+qBOUNAsdDc8AMNxinxWkcH1RrISdRJJJLa9+UocRfsvdbD7A7MMw+iZAAOlcBJO8fSqCNdf2W+yOwLIXsBFiAQeIIuLdyKwbc5jVXV4eZKtxfkldFHK7jJCGtNyfpWcXNzc8uuoJWdrixoAAAAA0AGgA7lyRBFCVAUBckUQVERAREugi4uchKrWoAauSIgIiIC8+33YuYMM6JhsamRtObfusrnyfAhmU/aXoK8m/SDjPk1K7kJ3tP2nREj8muQZFucwxkOEwvAGacuqHkcy5xDPBjWD4FZuvN9x20DZqE0Tj6ylJGv0qeR7nRuHcczfujrXpCDGt5OIdBhNXJexMRhafrzERNt8XheL1OzP/AA3DXhvptqpJXG2vk8rhT+GaKErPN/8AiBZQw07dTNNmI5mOJhNh990azCPZthwkYY7h5KKYnqf0Vs3fm1RXkG4rFeixF9OTYVERA7ZoiXtH4TKvf7rUjCq2SjqoqjKQ+CUPc0cbxvtIz4gPb8Sts6aZr2NkYbte0PaRwLHC4PgUOv1XhuAN/wAV2nkqXelFTudI2+oyU5EcNu9/rB8V6ptdjjKehq5mPBfDE7QEXbO9tog7qJJb4hea7qNnKh+D1T6aQRTVTxTxykuBZTRENc4Fuua7prWtqBqER7DVVkUYvLKxg65HNYPEldS/bPCwbHE6S/D/AJmH5lhVFuUpL9JV1c88n0iMsYJ+Ic/+Zdk3dHgxu0RyXHG1RISD2i+iDLaLaGimNoK2nkPVFNHIb9zSuxJXk+LblqYXkppXvIBPQ1JaWO9EjKJGtDmcjcg8PDDKfbauw2TyeMu9S4RyQz5jHZotkDHXMZtl9JrrEjMM2Y3DYoC65gLpNkNpYMRpm1MNxrkkjd7UcwAux3iCDzBBXdoCIiApdVSyCoiIIAqiIIqihQVF8kFZmcBl463vfle3BfWgLqtpsAgr6Z1LUA5XWIcw2cyQate08iPA6g3uu1RBiGwuwMGGGR8cr5ZJAGl0mVto2kkNa1vabk9g4LL0UcQNSg8g24Hlu0tFRcWQBkj7cnXM7wewtjiH3l684ryvdtQOnxWuxWTi4ubGBwEUjxkv9YMiaPifh6oAg103s4MY8WcyKJ5dUZJow0ghz5TlLWNsLOMjXcz7Q61mOL7SVWGUFLgtORNiLo2xeqGboWuJyNaD7TwLNF9LNzGwsDme27aWnaMYnYHSUccrYQbAOmmyNaO+4AB5Z3FYZupoWMe3FsQfeqxCV8dNm1Nsj3veB9HMGOA5BoYB7VkV0+2+HSYZgLKSeTPPV1XlNQ4EuJLW5zdx1eQWRAnmV6Ph+zlQzBoaCmqvJphFHeZrOkLZbh8tm3HtOLhe/MrCd5f+cx+gw8atZkc8cRZ7+klH/wA4B4r1jFq5sFPLUP8AZijfMfssYXH+iI1exzGcQ6aWCevnkMckkDvXSZC6N5YSG3ta4PJe5bnMJ6DCYnZQHTl1W6w4h5tGfwNZ4la9xU8s8jW3BknkDLi59fNJYX73ElbcUVM2KJkLBZsbGxtHUxrQB+QRev0a1eEb/KJjK+GZos6WEh9uZifYOPbZ4H3QveVrpvnxptTibo2G7Kdgprjh02Yukt3EhvewocdpuBrnNrp6e/oyQdKRyzxSMaD4Su/Je7rxv9H/AAV16ivcLNIFLEeuzg6UjsuIx3h3UvZEToi+SesykjLe3bY8L8LL60BERAREQEREBRFUH5R07Wm4FrdpX6oiAihPWqghKxjeNjjaTDppSSHOHk7Mti7pJPRuAdCQ3M7X9lZMQvEt6Nc/E8UgwemN2xvyPc3UCocPWOP8OMH4lwQZvudoyzC2SuaGmZzpQ0XIbCLMjAJJNsrARc/S6rBZwvwoaRkMTIY25WRsbEwDkxrQ1o8AF+6Dyff5VOdHR0LHWM8zn/FgbG2/WM0wP3Viu9jEnU+JU0FP6LcPihELeAEoIfy5FrYh3Bd1v7e6Oqw+e1wwSvHa+OWB9v6Lo989CDVxYlEc8FZEx7XjUdIxgFr9rMhHc7qRXe7tp/8AENoKvErHK1hcwO4jOGxRd3q43+KyzfTifQ4TIwH0p3sph9knO8fgY8fFdTuBw7JRTVJGs02UHriiaAP5nSLo/wBIHErzU1ID7DH1Lh9Z7skf5Mk8UGNbn8NM+LQ3vlgD6pw5Xa3Iz45nsP3VsiTzP+wtdN3GxFTXxy1EFe6lyPEF4w8l5yB7hdkjCAMzOvj2LNDuhqZRkq8cnlZ+wRI4W7pJnD8kH17xd6EMEb6aglbJUOBYZIyHRwcic3B0nUNQDqeFj5lsPsJVYk8Ps6Onvd9Q/XNrqIr/AKx56+A1v1H2DAd1GF0xDnROqHDgaoh7b/w2gM8QVnLGgAAAADQAaAAcgER8uFYdFTQsp4GZY42hjWjWwHWeZOpJ5klfWiIPyfTsJuRqdDqRov0VRARRVAXHOFSuOVBzKjUCqAiIgIiIPLd/WGVUtNDJCHvhic8zxsudSG9HK5o4tbZ47M1+0YZsRvRmomNhmBqIOQL7yx6a5HO0c2/Bp4dY4LYVdFXbG4ZM4vlw+nc48XGJmYntIGqDzXHt8EtS3yXC6SVssnoB8ga+QX/dRMLrn6xNh1FZNuq2DdQsdVVVjVSixF8/RRE3Lc30nk2Lj2Aa2ucxwrBaWmBFNTRQg8ehjbHfvIGq7BAREQYNve2ZfW0GaFpdNTu6djRxezKRIwdZINwOZaAvKditro2Rtw2ujE9FK8MLX3L4Xud+sYeTQ4g2Go1I10Ox6xqo2Dwt9UK11GzpQ4SXBe1plBuHujByOdfW5HFB2GzGBx0NKyjiJLI89i62Y55HPJdbibuWu287E/KMWqXg3ax/kzfswgMcPxh5+K2Px3E2UtNNVSezFG6TvIGjR2k2HxWqFJTyVM7Ir3knlbGSP3ssgBd4uui8bHbpcN6DCKcEelKDVO/9rszb/cLB8FmC/OnhaxjY2izWtDGjqa0WA/JcyURVFAVyQEUVQEREBcSqqgIol0FREQFFUQEUAVQEREBRVQoOLZWnQOB7iCua+KmpHNcCbaC2hPC3VZfagLH9qts6HDsorJi1zwXMa1j5HODbXPoiw4jiQsgXyz4dA94lfDG54GUPexrnBt72DiLgXKDwHeLvJOJMFNTRujpg4PdnsXyvafRzBtw1oOtrm5sdLWXQbvsVo6bEYqmskyxxZnjK0yHpspay7W62GYn7oW0zWgaAW7l89VSRP0kiY/7bWu/qEV0FLvCwqRpdHWAgf+OUEG17WLL3sCfgV++BbXUtZO+Cmc55jbne7Lla30soaQTmDjqRcWsCepfT5s0B40FNxDtYIvbHA+zx1Oq7SGBjBZjGtHGzQGi/cERzAVREBRVEBRLc1UBERAREQEURBUREBRVEBEUBQVERAREQERS6CPRrVyRAUVRARFLoKiIgIiICIpdBVFUQRAFUQEREBEUQVSyqICIiAiKIKpZVEBERAREQFLKogIiICIiApZVEBEUQVERARQlAgAqoiAiIgIiIICqiICIiAiIg+GCqcXgaWJIOluRX3LiGjqC5ICIiAiFQFAvyVRRBUREBERAXFzlrV5+4t7wl8I/lX3u2i2gEXTGepDMwYSYwCC5t2nLkvlPJ3AnS61lK2FtdcwFr1Q49tDMM0U9S4B2QkMYPSyyO5t6on69YtxIB+XzvxzT/ADNTq0yD1Y1ib7Tx6GrRzPAJkrY9Fru/aPaANDzNVAF5iF4gD0rWB5blyX9lwPDr6jb86XarHZGmRlXOWhjpc2VgaWMcA7K4ts4guGguUyVsWqta5dt8YYcr62Zp6nNY0+BauHn5i3vCXwZ8qZK2XRa0efmLe8JfCP5U8/MW94S+EfypkrZdFrR5+Yt7wl8I/lTz8xb3hL4R/KmStllVrR5+Yt7wl8I/lTz8xb3hL4M+VMlbLotaPPzFveEvhH8qefmLe8JfCP5UyVsui1o8/MW94S+Efyp5+Yt7wl8I/lTJWyyErWnz8xb3hL4R/Knn5i3vCXwZ8qZK2UvdcgFrT5+Yt7wl8GfKnn5i3vCXwj+VMlbLotaPPzFveEvhH8q+mk2uxuW/R1srstr26IWzXtxHYUyVsaqtdJdqcdb7VXKNcn/R9rKHW4dRBXAbXY3/AN7L/pf2TJWxqtlrVJtzi7TY18oI46R/KuPn5i3vCXwj+VMlY6P920/Pksyl3gPL2vbT2IMjnF0oJkfJDLHmk6OJjTYyh2jRfIOZLkRbZfnHtwWmzaZwYHZw3yk3zOkq3SXc2IAgiseB6PomNhJdbWVW3crmMY2JzMoiGZkrQbxPpiS0iIEZhTNBzF/HqGVEUnCvwrtsXyDKyJ8QL8zuinDXPifBHFKwkRBrXO6JpD2Nblu6zTdfVS7d9E8SRUeTKzoWxiof0DYRK57A2HKLPAdlz3vpcZURIMRmeC4kAgXNg53SODb6AusMxA52F1wRFQREQEREBERAREQEREBERAREQFyYW39Jod2Ekf0REH6CRn7ofid/dDIz90PxOURB+biL6Cw6hc28VERB/9k=" />
            <NavLink to="/"><h1>NerdPackager</h1></NavLink>
            <NavLink to="/about"><h2>About</h2></NavLink>
        </div>
    )
}
export default Navbar