<template>
<v-ons-page>
<a href="http://umematsuri.jp/"><img :src="getImage" alt="BANNER"  width="100%" border="0"></a>
<main class="h100">
<h1 v-if="this.language.lang=='ja'"><font size="3" color="#7f7f7f"><strong>あなたに近くのお店:</strong></font></h1>
<h1 v-else-if="this.language.lang=='ko'"><font size="3" color="#7f7f7f"><strong>당신에게 가까이 가게:</strong></font></h1>
<h1 v-else-if="this.language.lang=='zh'"><font size="3" color="#7f7f7f"><strong>你附近的一家商店:</strong></font></h1>
<h1 v-else="this.language.lang=='en'"><font size="3" color="#7f7f7f"><strong>Nearby shops for you:</strong></font></h1>
<div id="myDIV" v-html="recommendStakeholders"></div>
</main>
</v-ons-page>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import GoogleMap from './GoogleMap';
import { WEB_API_URL } from '../../.env';
import { FETCH_PROBLEMS } from '../vuex/mutation-types';
import stakeholders from '../assets/stakeholders';



function getTopKStakeholders(ltd, lng, stakeholders, k)
{
    var scores = [];
    for(var stakeholder in stakeholders)
    {
        scores.push(
        {
            key: stakeholders[stakeholder].stakeholder,
            url_link: stakeholders[stakeholder].url_link,
            value: Math.round(getDistanceFromLatLonInKm(ltd, lng, stakeholders[stakeholder].Position.Latitude, stakeholders[stakeholder].Position.Longitude)*100)/100
        }
        );
    }
    scores.sort(function (a, b) {
        return a.value - b.value
    });
    return scores.slice(0, k);
}


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}
function deg2rad(deg) {
return deg * (Math.PI/180)
}

function getMessages(lang){
    const messages = require('../assets/message.json');
    switch (lang){
    case 'ja':
        return messages.ja;
    case 'ko':
        return messages.ko;
    case 'zh':
        return messages.zh;
    default:
        return messages.en;
    }
}

export default {
  name: 'camera-page',
  components: {
    CustomToolbar,
    GoogleMap,
  },
  props: ['pageStack'],
  data() {
    return {
      latitude: '',
      longitude: '',
      isMapError: false,
      stakeholders,
      language: this.initialLanguage(),
    };
  },
  computed: {
    isIOS() {
      /* eslint-disable no-undef */
      try {
        return device.platform === 'iOS';
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    recommendStakeholders()
    {
        var topk = [];
        topk = getTopKStakeholders(this.latitude, this.longitude, stakeholders, 3);
        var tmpcmt;

        if(this.latitude != null && this.latitude !='')
        {
        var shopLang;
        var distanceLang;
//alert(this.language.lang);
            if( this.language.lang == 'ja')
            {
                 shopLang="お店";
                 distanceLang="距離";
            }
            else if ( this.language.lang == 'ko')
            {
                 shopLang="가게";
                 distanceLang="거리";
            }
            else if ( this.language.lang == 'zh')
            {
                 shopLang="一家商店";
                 distanceLang="距离";
            }
            else
            {
                 shopLang="Shops";
                 distanceLang="Distance";
            }

//alert(shopLang+distanceLang);

        tmpcmt = '<table border="1" cellspacing="0" cellpadding="0" bordercolor="black"><tr><td><font size="3" color="#7f7f7f"><strong>'+shopLang+'</strong></font></td><td><font size="3" color="#7f7f7f"><strong>'+distanceLang+', km</strong></font></td></tr>';
        for (var j = 0; j < topk.length; j++)
        {
        tmpcmt = tmpcmt + '<tr><td align="left">';
        tmpcmt = tmpcmt + '<a href='+ topk[j].url_link + '>' + topk[j].key + '</a>';
        tmpcmt = tmpcmt + '</td>';
        tmpcmt = tmpcmt + '<td>';
        tmpcmt = tmpcmt + topk[j].value;
        tmpcmt = tmpcmt + '</td></tr>';
        }
        tmpcmt = tmpcmt + '</table>';

        return tmpcmt;
        }
    },
    getImage(){
        switch (this.language.lang){
            case 'ja':
                return require('./../assets/jbanner.png');
            case 'ko':
                return require('./../assets/kbanner.png');
            case 'zh':
                return require('./../assets/cbanner.png');
            default:
                return require('./../assets/banner.png');
        }
    },
  },
  methods: {
    initialLanguage(){
        if(window.localStorage.getItem('deviceLanguage') == null){
            window.localStorage.setItem('deviceLanguage', 'en');
        }
        const lang = window.localStorage.getItem('deviceLanguage');
        var labels = getMessages(lang);
        return {labelLang:labels.labelLang, lang:lang};
    },
  },
  created() {
    navigator.geolocation.getCurrentPosition(
    (position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
  },
};

</script>

<style lang="scss" scoped>
@import "./../../config.scss";

.h100 {
height:100%;
}
main {
padding: 5px;
box-sizing: border-box;
}
.centering {
display: flex;
justify-content: center;
align-items: center;
}
.card-list {
margin: 0;
padding: 0;
list-style-type: none;
padding-bottom: 100px;
}
.card-list > li {
margin: 10px 0;
}
.w100 {
width: 100%;
}

.style {
color: #FFF;
background-color: $main-color;
}

.comment {
display: flex;
align-items: center;
justify-content: center;
flex-grow: 9;
color: #7f7f7f;
}

</style>

