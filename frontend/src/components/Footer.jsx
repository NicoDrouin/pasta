import React from 'react';

const Footer = () => {
    return (
        <footer id='footer'>
            <div className='container'>
                <ul>
                    <li>
                        <ul>
                            <li><a href="https://www.djangoproject.com/">Django: The Web framework for perfectionists with deadlines</a></li>
                            <li><a href="https://www.django-rest-framework.org">Django REST Framework</a></li>
                            <li><a href="https://reactjs.org/">React – A JavaScript library for building user interfaces</a></li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li><a href="https://www.venganza.org/">Church of the Flying Spaghetti Monster</a></li>
                            <li><a href="http://spaghettimonster.com/">The Flying Spaghetti Monster</a></li>
                            <li><a href="https://en.wikipedia.org/wiki/Flying_Spaghetti_Monster">Flying Spaghetti Monster - Wikipedia</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
 
export default Footer;