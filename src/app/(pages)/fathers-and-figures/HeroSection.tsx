import React from 'react'
import TitleDiscription from '@/app/my_components/shared/TitleDiscription'
import { Background } from './Background'

// Static Content: Data for rendering the page title and page description in English and Marathi for Fathers and Figures page.
const content = {
    title: "Fathers and Figures",
    description: {
      eng: "Intergenerational caste-patriarchal trauma hollows the very substance from our relationship with our fathers, generations after generations. The collective emotional hijacking of our fathers by the caste-patriarchal forces have badly crippled our emotional development in turn. The deliberate dumbing and numbing of the self, as a response to either obey or tolerate these casteist and patriarchal structures is our own inherited unhealed trauma too. Across the social spectrum, extra-familial patriarchal personalities as father figures occupy the vacuum left by emotionally absent men within our families who were already kidnapped away or baptized by caste-patriarchal systems for its own agenda.\n\nStrong savior icons with political and spiritual persona, figuratively come to occupy this vacant/inactive position of a father figure and ultimately to rescue his followers. There is often a risk that these father figures would reinforce similar paternal and hero-worshipping hierarchical norms. On the other hand, Dr Ambedkar, as an ideal father figure, with incredible grace and compassion in his imagery, has been easily accessible to his follower through his ideals. Yet, the complete lack of substance in my relationship with my own father continues to tremble me. As I am approaching my father's age when he had become a father himself, I realize that I have been growing into a similar emotional space as he already had. I am reciprocating the inactivity in the bond and contributing to it's hollowness in similar ways.\n\nThe father-son/daughter crisis is our collective wound and still there is so much scope for individual nuance as well. I invite you to move the photo-pieces in my story and see if it turns into yours.",
      mar: "पिढ्यान पिढ्या बापलेक/बापलेकीच्या नात्यांतला गाभाच पिढीजात जातीय-पुरुषकेंद्री आघात पोखरत राहिले आहेत. आपल्या बापमंडळींचं जातीय-पुरुषधार्जिण्या संस्कृतीने केलेलं सामूहिक अपहरण अथवा पदहरण हे आपल्या भावनिक विकासाच्या अपूर्णतेची कारणमिमांसा आहे. मुद्दामहून मंद आणि संथ करवलेली आपली मने, आणि काही वेळी कट्टरतेने पुरस्कार, असे प्रतिसाद खरे तर अश्या जातीय-पुरुषी व्यवस्थेच्या एकतर अंकुशांत किंवा सहनशीलतेतून घडलेली पिढीजात भावनिक व्रणांचीच देण आहे. समाजातल्या कुठल्याही स्तरात असो, जातीय-पुरुषकेंद्री व्यवस्थेने स्वतःच्याच मशागतीसाठी पळवलेल्या किंवा वळवलेल्या, आणि त्यामुळे भावनिक दृष्ट्या घरातून बुट्टी असलेल्या माणसांच्या रिकाम्या जागांवर मग बड्या पुरुषी व्यक्तिमत्त्वांनी पिता-समान स्थान निर्माण केलेले असते.\n\nअशा वेळी राजकीय आणि अध्यात्मिक मार्गदाते लाक्षणिकरित्या हि वडील व्यक्तीची रिकामी/अव्यक्त जागा भरून काढतात आणि त्यांच्या अनुयायांना आधार देतात. परंतु बहुतेकदा हेच बडे पितासमान मंडळी त्याच पुरुषी आणि व्यक्तिपूजेच्या उतरंडीत स्वतःला रुजवतात. अश्या बड्या आणि जोखमीच्या बाप्यांच्या गर्दीत, बाबासाहेब एक काळजीवाहू आणि आदर्श पिताकृती म्हणून आपल्या विचारांच्या आणि आदर्शाच्या माध्यमातून सामान्य आंबेडकरवाद्याला सहज भेटण्याजोगे आहेत. तरीही, जवळपास सगळंच पोकळ असलेलं माझ्या वडिलांशी असलेलं माझं नातं अजूनही अंगावर शहारे आणतं. माझ्या जन्माच्या वेळी माझे वडील होते त्या वयाचं होत असताना आता लक्षात येतंय कि मी देखील भावनिकरीत्या त्याच छापाचा होत आहे. आमच्या दोघांमधल्या नात्यातल्या पोकळपणाला आणि थंडपणाला माझादेखील तेवढाच हातभार आहे, मीदेखील तितकाच जबाबदार आहे.\n\nबापलेक/बापलेकीच्या नात्यावरच हे ग्रहण हे बहुतेक आपल्या सगळ्यांचीच सामाईक जखम असूनही आपल्या प्रत्येकाच्या घरातली कहाणी थोडी-थोडी वेगळी असेल. मी वरवर सांगू पाहत असलेली हि माझी चित्रकथा, ज्याचे हिस्से खालीवर ड्रॅग करून कदाचित तुम्हाला तुमचीही कथा सापडेल ह्या अपेक्षेने इथे मांडतोय.",
    },
  }

// Hero Section of the Fathers and Figures page with Title and Description rendered overlayed on a custom Background component
const HeroSection = () => {
  return (
    <TitleDiscription
        title={content.title}
        description={content.description}
        background={<Background />}
    />
  )
}

export default HeroSection
