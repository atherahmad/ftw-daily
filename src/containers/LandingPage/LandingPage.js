import React, { Component } from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
  NamedLink,
  NewsletterForm,
  Slider,
  Slider2,
  Slideshow,
  SectionHowItWorks,
  SectionSteps,
  Logo,
  LandingLocationSelect,
} from '../../components';

import selecticon from '../../assets/icons/select.png';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { FormattedMessage } from '../../util/reactIntl';

import css from './LandingPage.css';

//import { gsap, TweenMax } from 'gsap/all';

import { InView } from 'react-intersection-observer';

//ICONS

import insta from '../../assets/icons/socialmedia/insta.png';
import fb from '../../assets/icons/socialmedia/facebook.png';

import NGO from './NGO.png';
import Dest from './destinations.png';

import heroImage from '../../assets/landingPage/chumbeisland.webp';
import cloud1 from '../../assets/clouds/cloud1.png';
import cloud2 from '../../assets/clouds/cloud2.png';

import LoaderImage1 from '../../assets/loader/world.png';
import LoaderImage2 from '../../assets/loader/airplane.png';

import article1 from '../../assets/articles/article1.png';
import article2 from '../../assets/articles/article2.png';
import article3 from '../../assets/articles/article3.png';
import article4 from '../../assets/articles/article4.png';
import article5 from '../../assets/articles/article5.png';
import article6 from '../../assets/articles/article6.png';

import TextTransition, { presets } from 'react-text-transition';
import { ThreeSixtySharp } from '@material-ui/icons';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
// import { search } from 'core-js/fn/symbol';

const WORDS =
  cookies.get('language') === 'en'
    ? ['education', 'nature protection', 'animal protection', 'equality']
    : ['Naturschutz', 'Bildung', 'Tierschutz', 'Gleichberechtigung'];

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textTransitionIndex: 0,
      loadingState: false,
      group1_item1_header: '',
      group1_item1_image1: '',
      searchRegion: 'worldwide',
      search: 'bounds=85.051129%2C179.00736739%2C-75.14077719%2C-160.60200761',
      section: 0,
    };
    // Don't call this.setState() here!
  }

  componentDidMount() {
    window.scrollTo({ top: 0 });
    var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    function preventDefault(e) {
      e.preventDefault();
    }

    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    }

    // modern Chrome requires { passive: false } when adding event
    var supportsPassive = false;
    try {
      window.addEventListener(
        'test',
        null,
        Object.defineProperty({}, 'passive', {
          get: function () {
            supportsPassive = true;
          },
        })
      );
    } catch (e) { }

    var wheelOpt = supportsPassive ? { passive: false } : false;
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    // call this to Disable
    function disableScroll() {
      window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
      window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
      window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
      window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }

    // call this to Enable
    function enableScroll() {
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
      window.removeEventListener('touchmove', preventDefault, wheelOpt);
      window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    }
    disableScroll();

    setTimeout(() => {
      enableScroll();
    }, 3000);

    setInterval(() => {
      this.setState({
        textTransitionIndex: this.state.textTransitionIndex + 1,
      });
    }, 3000);

    if (window.location.hash) {
      window.location = '/';
    }

    // fetch(
    //   'https://flex-api.sharetribe.com/v1/api/listings/query?keywords=Grundschule&page=1&include=author,images&fields.listing=title,geolocation,price&fields.user=profile.displayName,profile.abbreviatedName&fields.image=variants.landscape-crop,variants.landscape-crop2x&limit.images=1&per_page=3',
    //   {
    //     method: 'GET',
    //     headers: {
    //       authorization:
    //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXJrZXRwbGFjZS1pZCI6IjVmNjk5MjY3LWQ3ODAtNGYxZC1iM2FkLTE3MWYzYjc4OWEwMyIsImNsaWVudC1pZCI6ImEyMzczNWQ4LWQzYTgtNDM1Zi1hYzk1LWZmOWM4YzdmZTM4OSIsInRlbmFuY3ktaWQiOiI1ZjY5OTI2Ny1kNzgwLTRmMWQtYjNhZC0xNzFmM2I3ODlhMDMiLCJzY29wZSI6InB1YmxpYy1yZWFkIiwiZXhwIjoxNjAzOTg2OTA2fQ.IRB3O1T-CjQ5c7zb8yZK6uGq_rVVzGkpyHu2AYcBxK8',
    //     },
    //   }
    // )
    //   .then(res => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       throw Error(res.statusText);
    //     }
    //   })
    //   .then(json => {
    //     this.setState({
    //       isLoaded: true,
    //       group1_item1_header: json.data[0].attributes.title,
    //       group1_item1_image1: json.data[0].relationships.images.data[0].id,

    //       group1_item1_geo_lat: json.data[0].attributes.geolocation.lat,
    //       data: json.data,
    //     });
    //   })
    //   .catch(error => console.error(error));

    //document.onscroll = function() {
    /* var pos = (document.body.parentNode.scrollTop / window.innerHeight) * 100;

      var isMobile = false; //initiate as false
      // device detection
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
          navigator.userAgent
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          navigator.userAgent.substr(0, 4)
        )
      ) {
        isMobile = true;
      }

      if (window.location.pathname === '/') {
        if (isMobile === false) {
          if (pos < 29) {
            window.location.hash = '#sectionZero';
          }
          if (pos < 100 && pos > 30) {
            window.location.hash = '#sectionOne';
          }
          if (pos > 99) {
            window.location.hash = '#sectionTwo';
          }
          // if (pos > 350) {
          //   window.location.hash = '#sectionOne';
          // }
        } else {
          if (pos > 100) {
            window.location.hash = '#sectionTwo';
          }
          if (pos < 99 && pos > 30) {
            window.location.hash = '#sectionOne';
          }
          if (pos < 29 && pos > 0) {
            window.location.hash = '#sectionZero';
          }
        }
      }*/
    //};
  }

  handleImageLoaded() {
    /*     setTimeout(() => {
          this.setState({ loadingState: true });
    
          var element = document.getElementById('heroWrapper');
          element.classList.add(css.heroWrapper_active);
    
          setTimeout(() => {
            var target = document.querySelector('#anima');
            target.style.opacity = 1;
            TweenMax.staggerFrom(
              target,
              1,
              {
                skewX: '5deg',
                skewY: '5deg',
                opacity: 0,
                y: 80,
              },
              0.27
            );
          }, 500);
    
          setTimeout(() => {
            var targetTop = document.querySelector('#topbar');
            targetTop.style.opacity = 1;
    
            TweenMax.staggerFrom(
              targetTop,
              0.75,
              {
                opacity: 0,
              },
              0.67
            );
    
            var target2 = document.querySelector('#anima2');
            target2.style.opacity = 1;
    
            TweenMax.staggerFrom(
              target2,
              0.75,
              {
                skewX: '5deg',
                skewY: '5deg',
                opacity: 0,
                y: 30,
              },
              0.27
            );
          }, 1000);
        }, 500); */
  }

  render() {
    const setSection = num => {
      this.setState({ ...this.state, section: num });
    };
    const handleChange = event => {
      console.log('location: ' + this.state.searchRegion);
      this.setState({
        searchRegion: event.target.value,
      });
      if (event.target.value === 'worldwide') {
        this.setState({
          search: 'bounds=85.051129%2C179.00736739%2C-75.14077719%2C-160.60200761',
        });
      }

      if (event.target.value === 'africa') {
        this.setState({
          search: 'bounds=42.20773073%2C70.98875672%2C-38.53322805%2C-30.25662092',
        });
      }
      if (event.target.value === 'southamerica') {
        this.setState({
          search: 'bounds=33.06714048%2C-19.33722285%2C-59.94294912%2C-157.3194169',
        });
      }
      if (event.target.value === 'asia') {
        this.setState({
          search: 'bounds=75.78022072%2C-171.54093176%2C-13.88336829%2C35.90487732',
        });
      }
      if (event.target.value === 'europe') {
        this.setState({
          search: 'bounds=70.58376206%2C43.23000513%2C35.74947721%2C-28.69256351',
        });
      }
    };

    const slideData = [
      {
        index: 0,
        itemsHeader: <FormattedMessage id="southamerica" />,
        headline: <FormattedMessage id="landing.story.headline0" />,
        location: 'Fazenda Sauva',
        src: require('../../assets/landingPage/slider_images/Fazenda_story.jpg'),
        link: '/l/fazenda-sauva-doublebedroom/60702e23-291a-4c32-9698-ec5fcf9c4905',
        showAllLink: '/s?bounds=72.0741925%2C5.52942129%2C-60.63086196%2C156.59038428',

        item1_image: require('../../assets/landingPage/slider_images/missionSurf.jpg'),
        item1_link:
          '/l/mision-mexico-and-mision-surf-mexico-shared-bedroom/60744388-d16d-4c56-bf3c-f88ea77ad7b4',
        item1_header: 'Mission Surf Mexico',
        item1_location: <FormattedMessage id="lasPalmas" />,
        item1_rating: '4.95',
        item1_price: '47$',
        category1: require('../../assets/categories/sports.png'),

        item2_image: require('../../assets/landingPage/slider_images/AldeaYanapay.jpg'),
        item2_link:
          '/l/aldea-yanapay-sanctuary-lodge-villa-magica-shared-bedroom/6078119d-a90f-4930-bf04-1497c56433c3',
        item2_header: 'Aldea Yanapay',
        item2_location: <FormattedMessage id="lanay" />,
        item2_rating: '4.95',
        item2_price: '22$',
        category2: require('../../assets/categories/education.png'),

        item3_image: require('../../assets/landingPage/slider_images/Fundacion.jpg'),
        item3_link:
          '/l/fundacion-tiemp-de-juego-shared-bedroom/607026fd-41cb-4d6d-afa9-38beb0e0d6fa',
        item3_header: 'Fundacion Tiempo de Juego',
        item3_location: <FormattedMessage id="cienaga" />,
        item3_rating: '4.95',
        item3_price: '10$',
      },
      {
        index: 1,
        itemsHeader: <FormattedMessage id="europe" />,
        headline: <FormattedMessage id="landing.story.headline3" />,
        location: 'Enriquez Arte',
        src: require('../../assets/landingPage/slider_images/Erfolgsstory_Europa.jpg'),
        link: '/l/enriquezarte-shared-bedroom/606c6f7d-012d-41cb-bd14-5faa5c89739c',
        showAllLink: '/s?bounds=70.58376206%2C43.23000513%2C35.74947721%2C-28.69256351',

        // item1_image: require('../../assets/landingPage/slider_images/hausDerSolidarität.jpg'),
        item1_image: require('../../assets/landingPage/slider_images/Haus_Solidaritat.jpg'),
        item1_link: '/l/house-of-solidarity-shared-bedroom/6074166c-ab53-4b88-a765-e1cea4d9ff2b',
        item1_header: 'Haus der Solidarität',
        item1_location: <FormattedMessage id="bolzano" />,
        item1_rating: '4.95',
        item1_price: '14$',
        category1: require('../../assets/categories/equality.png'),

        item2_image: require('../../assets/landingPage/slider_images/enriquez.jpg'),
        item2_link: '/l/enriquezarte-shared-bedroom/606c6f7d-012d-41cb-bd14-5faa5c89739c',
        item2_header: 'Enriquez Arte',
        item2_location: <FormattedMessage id="barcelona" />,
        item2_rating: '4.95',
        item2_price: '28$',
        category2: require('../../assets/categories/education.png'),

        item3_image: require('../../assets/landingPage/slider_images/Rifugio.jpg'),
        item3_link: '/l/rifugio-isola-del-sole-shared-bedroom/6071864c-f178-4255-a1eb-bf9b71688ad9',
        item3_header: 'Rifugio Isola del Sole',
        item3_location: <FormattedMessage id="noto" />,
        item3_rating: '4.95',
        item3_price: '47$',
      },
      {
        index: 2,
        itemsHeader: <FormattedMessage id="asia" />,
        headline: <FormattedMessage id="landing.story.headline1" />,
        location: 'Heaven Hill Academy',
        src: require('../../assets/landingPage/slider_images/heavenHill_story.jpg'),
        link: '/l/heaven-hill-academy-shared-bedroom/6065cf49-82fe-40dc-bbd7-1e0815f61227',
        showAllLink: '/s?bounds=75.78022072%2C-171.54093176%2C-13.88336829%2C35.90487732',

        item1_image: require('../../assets/landingPage/slider_images/earth.jpg'),
        item1_link: '/l/earth-company-shared-bedroom/606ecffd-5fb6-4a77-a519-2c6fa25a1323',
        item1_header: 'Earth Company',
        item1_location: <FormattedMessage id="ubud" />,
        item1_rating: '4.95',
        item1_price: '23$',
        category1: require('../../assets/categories/education.png'),

        item2_image: require('../../assets/landingPage/slider_images/KindredSpirit.jpg'),
        item2_link:
          '/l/kindred-spirit-elephant-sanctuary-doublebedroom/60718b37-8b93-460b-8af5-ba9d587cd9f8',
        item2_header: 'Kindred Spirit Elephant Sanctuary',
        item2_location: <FormattedMessage id="chiangMai" />,
        item2_rating: '4.95',
        item2_price: '212$',
        category2: require('../../assets/categories/animal.png'),

        item3_image: require('../../assets/landingPage/slider_images/Raintree.jpg'),
        item3_link: '/l/raintree-foundation-doublebedroom/607473d3-e2ac-43de-8ba8-506b1551be01',
        item3_header: 'Raintree Foundation',
        item3_location: <FormattedMessage id="chiangMai" />,
        item3_rating: '4.95',
        item3_price: '28$',
      },

      {
        index: 3,
        itemsHeader: <FormattedMessage id="africa" />,
        headline: <FormattedMessage id="landing.story.headline2" />,
        location: 'Tenikwa Wildlife',
        subHeadlineLocation: 'Gaunshanar, Nepal',
        src: require('../../assets/landingPage/slider_images/Tenikwa_story.jpg'),
        link: '/l/tenikwa-wildlife-doublebedroom/6065c158-70e9-4634-b373-b430eedadee0',
        showAllLink: '/s?bounds=42.20773073%2C70.98875672%2C-38.53322805%2C-30.25662092',

        item1_image: require('../../assets/landingPage/slider_images/shangila.jpg'),
        item1_link: '/l/shangilia-singlebedroom/606ecb3e-4859-4437-bd24-473b33c61165',
        item1_header: 'Shangilia',
        item1_location: <FormattedMessage id="nairobi" />,
        item1_rating: '4.95',
        item1_price: '36$',
        category1: require('../../assets/categories/education.png'),

        item2_image: require('../../assets/landingPage/slider_images/Chumbe.jpg'),
        item2_link:
          '/l/chumbe-island-coral-park-shared-bedroom/6076f135-d5ac-46a0-9694-45f04752505e',
        item2_header: 'Chumbe Island',
        item2_location: <FormattedMessage id="zanzibar" />,
        item2_rating: '4.95',
        item2_price: '330$',
        category2: require('../../assets/categories/environment.png'),

        item3_image: require('../../assets/landingPage/slider_images/Africachild_Unterkunft.jpg'),
        item3_link: '/l/africachild-doublebedroom/606c1fc0-8b1a-432f-8da2-ef9063595421',
        item3_header: 'Africa Child',
        item3_location: <FormattedMessage id="dianiBeach" />,
        item3_rating: '4.95',
        item3_price: '59$',
      },
    ];

    const slideData2 = [
      {
        index: 0,
        headline: <FormattedMessage id="landing.community.headline0" />,
        subHeadline: 'Kathrin',
        linkName: 'Go Pang Na',
        link: '/l/volun2thai/5fa182fe-db14-4fa4-8e01-90da66594474',

        src: require('../../assets/landingPage/reviews/Kathrin.jpg'),
      },

      {
        index: 1,
        headline: <FormattedMessage id="landing.community.headline1" />,
        linkExternal: 'Utopia.de',
        link: 'https://utopia.de/ratgeber/socialbnb-uebernachten-und-gutes-tun/',
        src: require('../../assets/landingPage/reviews/penduka.jpg'),
      },

      {
        index: 2,
        headline: <FormattedMessage id="landing.community.headline2" />,
        subHeadlineNGO: <FormattedMessage id="Slider2.japheth" />,
        linkNameNGO: 'Shangilia',
        src: require('../../assets/landingPage/reviews/shangilia.jpg'),
      },
      {
        index: 3,
        headline: <FormattedMessage id="landing.community.headline3" />,
        subHeadline: 'Markus',
        linkName: 'YAWE',
        link: '/l/volun2thai/5fa182fe-db14-4fa4-8e01-90da66594474',

        src: require('../../assets/landingPage/reviews/markus.jpg'),
      },
      {
        index: 4,
        headline: <FormattedMessage id="landing.community.headline4" />,
        linkExternal: 'Jetzt.de',
        link:
          'https://www.jetzt.de/reise/socialbnb-mit-einer-uebernachtung-kannst-du-eine-hilfsorganisation-unterstuetzen',

        src: require('../../assets/landingPage/reviews/kululeke.jpg'),
      },

      {
        index: 5,
        headline: <FormattedMessage id="landing.community.headline5" />,
        subHeadline: 'Jenny',
        linkName: 'Shangilia',
        link: '/l/volun2thai/5fa182fe-db14-4fa4-8e01-90da66594474',

        src: require('../../assets/landingPage/reviews/jenni.jpg'),
      },
      {
        index: 6,
        headline: <FormattedMessage id="landing.community.headline6" />,
        subHeadlineNGO: <FormattedMessage id="Slider2.mildred" />,
        linkNameNGO: 'Intiwawa',
        link: '/l/volun2thai/5fa182fe-db14-4fa4-8e01-90da66594474',
        src: require('../../assets/landingPage/reviews/Mildred.jpg'),
      },
    ];

    var isMobile = false; //initiate as false
    // device detection
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      isMobile = true;
    }

    const pageContent = (
      <div style={{ width: '100vw', overflow: 'hidden' }}>
        <div id="topbar" className={css.topbar} style={{ position: 'fixed', width: '100vw' }}>
          <TopbarContainer />
        </div>
        <div className={css.LeftFooterContent}>
          <img src={insta} className={css.socialmedia}></img>
          <img src={fb} className={css.socialmedia2}></img>
        </div>
        <div className={css.section}>
          <div id="heroWrapper" className={css.heroWrapper}>
            <div className={css.HeaderWrapper}>
              <div className={css.HeaderWrapperRow}>
                <h1 id="anima" className={css.Header1}>
                  <FormattedMessage id="landing.headline1" />
                </h1>
              </div>
              <div id="anima2" className={css.vision}>
                <h3>
                  <FormattedMessage id="landing.subHeadline1" />
                  <span style={{ paddingLeft: '7px', paddingRight: '7px' }}>
                    <Logo format="desktop" className={css.logo} style={{ marginTop: '-2px' }} />
                  </span>
                  <FormattedMessage id="landing.subHeadline2" />{' '}
                  <TextTransition
                    style={{ color: '#1c7881' }}
                    inline
                    text={WORDS[this.state.textTransitionIndex % WORDS.length]}
                    className="transition-text"
                    springConfig={presets.gentle}
                  />
                </h3>
              </div>
            </div>

            <div className={css.bookingLink}>
              <LandingLocationSelect
                css={css}
                onChange={handleChange}
                value={this.state.searchRegion}
              />
              <NamedLink
                name="SearchPage"
                to={{
                  search: this.state.search,
                }}
                className={css.heroButton}
              >
                <FormattedMessage id="landing.bookingButton" />
              </NamedLink>
            </div>
            <div className={css.cloudsOuter}>
              <img className={css.clouds} src={cloud1}></img>
            </div>
            <img
              onLoad={this.handleImageLoaded.bind(this)}
              className={css.heroImage}
              src={heroImage}
              width="100%"
            ></img>
          </div>
        </div>
        <InView>
          {({ inView, ref1, entry }) => {
            console.log(inView);

            return (
              <div ref={ref1} className={css.section1a}>
                <div>
                  <SectionSteps></SectionSteps>
                </div>
              </div>
            );
          }}
        </InView>
        <div className={`${css.section} ${css.section2}`}>
          <h2 className={css.sectionHeader2}>
            <FormattedMessage id="landing.bookingsHeadline" />
          </h2>
          <div className={css.lineCarousel}></div>

          <Slider heading="Example Slider" slides={slideData} slideStates={this.state} />
        </div>
        <SectionHowItWorks></SectionHowItWorks>
        <div className={`${css.section} ${css.section4}`}>
          <h2 className={css.sectionHeader}>
            <FormattedMessage id="landing.community" />
          </h2>
          <div className={css.lineCarousel}></div>

          <Slider2 heading="Example Slider" slides={slideData2} slideStates={this.state} />

          <div className={css.articles}>
            <ExternalLink
              className={css.articlesItems}
              href="https://www1.wdr.de/radio/cosmo/magazin/specials/socialbnb-100.html"
            >
              <img src={article1} width="100%"></img>
            </ExternalLink>
            <ExternalLink
              className={css.articlesItems}
              href="https://www.deutschlandfunknova.de/beitrag/socialbnb-guenstige-uebernachtungsmoeglichkeiten-bei-hilfsorganisationen"
            >
              <img src={article2} width="100%"></img>
            </ExternalLink>
            <ExternalLink
              className={css.articlesItems}
              href="https://www.jetzt.de/reise/socialbnb-mit-einer-uebernachtung-kannst-du-eine-hilfsorganisation-unterstuetzen"
            >
              <img src={article3} width="100%"></img>
            </ExternalLink>
            <ExternalLink
              className={css.articlesItems}
              href="https://www.br.de/puls/themen/welt/socialbnb-sozialvertraeglich-reisen-100.html"
            >
              <img src={article4} width="100%"></img>
            </ExternalLink>
            <ExternalLink
              className={css.articlesItems}
              href="https://utopia.de/ratgeber/socialbnb-uebernachten-und-gutes-tun/"
            >
              <img src={article5} width="100%"></img>
            </ExternalLink>
            <ExternalLink
              className={css.articlesItems}
              href="https://reset.org/blog/socialbnb-ngos-uebernachten-und-so-wirkungsvoll-unterstuetzung-leisten-03262019"
            >
              <img src={article6} width="100%"></img>
            </ExternalLink>
          </div>
        </div>

        <div className={`${css.section} ${css.section5}`}>
          <Footer></Footer>
        </div>
      </div>
    );

    const loader =
      this.state.loadingState === false ? (
        <div className={css.loader}>
          <img src={LoaderImage2} className={css.loaderImage2} width="100px"></img>

          <img src={LoaderImage1} className={css.loaderImage1} width="100px"></img>
          {/* <CircularProgress size={50} thickness={2} style={{ color: '#353535' }} /> */}
        </div>
      ) : null;
    return (
      <StaticPage
        title="Landing Page"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'LandingPage',
          description: 'About Saunatime',
          name: 'Landing page',
        }}
      >
        <div id="my-scrollbar" className={css.Wrapper}>
          {loader} {pageContent}
        </div>
      </StaticPage>
    );
  }
}

export default LandingPage;
