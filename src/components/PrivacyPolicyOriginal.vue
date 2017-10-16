<template>
  <v-ons-page>
    <custom-toolbar></custom-toolbar>
    <div id="privacy" style="margin: 5%">
      <h1>Fukurepo Privacy Policy</h1>
        <p>Our service is for collecting problems in the city. The problems gathered will be used to improve the city.</p>
        <p>The problem you posted is useful for the city and for people.You are a hero!<br></p>
        <p>This Privacy Policy describes how and when we collect, use, and
          share your information across our APIs, email notifications, applications, and from our partners and other third parties.
          For example, you send us information when you use our Services on Fukurepo for Android or iOS.
          When using any of our Services you consent to the collection, transfer, storage, disclosure, and use of your information as described in this Privacy Policy.
          This includes any information you choose to provide that is deemed sensitive under applicable law.
        </p>
      <p>If you have any questions or comments about this privacy policy, please email to tsukuba.ngs#gmail.com(please convert # to @)</a>.<br>
      </p>

      <h3>Information Collection and Use</h3>
      <p>We collect and use your information below to provide, understand, and improve our Services.</p>
      <p><b>Basic Account Information:</b>&nbsp;
        When creating a Fukurepo account, you need to provide us with personal information such as password, e-mail address, gender, nationality, age.
        On Fukurepo, your posted problem are always listed publicly,including on your profile (not included email address).
      </p>

      <p><b>Location Information:</b>&nbsp;
         Location Information: We receive your location when you post a problem.
         We may also determine location by using other data from your device, such as precise location information from GPS, information
         about wireless networks or cell towers near your mobile device, or your IP address.
      </p>

      <h3>Information Sharing and Disclosure</h3>
      <p>We do not disclose your private personal information except in the limited circumstances described here.<br>
      </p>
      <p><b>Law and Harm:</b>&nbsp;
        Notwithstanding anything to the contrary in this Privacy Policy,
        we may preserve or disclose your information if we believe that it is reasonably necessary to comply with a law,
        regulation, legal process, or governmental request;
        to protect the safety of any person; to address fraud, security or technical issues; or to protect our or our users’ rights or property.
        However, nothing in this Privacy Policy is intended to limit any legal defenses or objections
        that you may have to a third party’s, including a government’s, request to disclose your information.
      </p>
      <p><b style="font-family: inherit;font-style: inherit;">Non-Personal, Aggregated, or Device-Level Information:</b>&nbsp;
        We may share or disclose non-personal, aggregated, or device-level information.This information does not include your profile.<br>
      </p>

      <h3>Changes to this Policy</h3>
      <p>We may revise this Privacy Policy from time to time. The most current version of the policy will govern our use of your information and will always be at this page.
         If we make a change to this policy that, in our sole discretion, is material, we will notify you via an email or push notification.
         By continuing to access or use the Services after those changes become effective, you agree to be bound by the revised Privacy Policy.
      </p>

      <p><b>Effective</b>: August 25, 2017</p>

      <!-- <p><a href="previous">Archive of Previous Privacy Policies</a></p> -->

      <p>Thoughts or questions about this Privacy Policy?&nbsp;Please, let us know by contacting us&nbsp; tsukuba.ngs#gmail.com(please convert # to @) &nbsp;or  the appropriate address below</p>

      <p><b style="font-family: inherit;font-style: inherit;">For accounts based in Japan</b><br></p>

      <p>Team. NGS<br> Attn: Privacy Policy Inquiry<br> 1-1-1 3F817, Tennoudai<br> Tsukuba, Ibaraki,Japan</p>

      <p>Kitagawa and Amagasa Data Engineering Lab<br> Attn: Privacy Policy Inquiry<br> 1-1-1 SB0912, Tennoudai<br> Tsukuba, Ibaraki,Japan</p>

      <div class="">© 2017 Kitagawa and Amagasa Data Enginieering Lab</div>
    </div>
  </v-ons-page>
</template>

<script>
import CustomToolbar from './CustomToolbar';

export default {
  name: 'privacy-page',
  components: {
    CustomToolbar,
  },
};
</script>

<style scoped>
input {
  width: 100%;
}

#privacy{
  text-align: left;
}

.title {
  height: 100%;
  box-sizing: border-box;
  padding: 3px 0;
}
.title-icon {
  height: 100%;
}
</style>
