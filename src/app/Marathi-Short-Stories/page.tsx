import WritingsSnapscroll from "../my_components/image_bodies/writings_snapscroll";
import TitleDiscription from "../my_components/common/TitleDiscription";

const content = {
  title: "Imagining Images",
  description: {
    eng: "Few convoluted flash-fictions titled by abstract visuals, in a secret pursuit of articulating & visualizing disturbed relationships with the self and others.",
    mar: "काही अमूर्त चित्रांनी शीर्षकबद्ध करून संदर्भहिन स्पष्टीकरणात गुंडाळलेल्या फ्लॅश-फिक्शन कथा. स्वतःशी आणि इतरांशी असलेल्या अस्थिर नातेसंबंधांना शब्द आणि रूप देण्याच्या सुप्त हेतूने.",
  },
};

const background = (
  <div className='bg-slate-200 h-full w-full'></div>
)


export default function Home() {
  return (
    <div className="min-h-screen">
      <TitleDiscription
        title={content.title}
        description={content.description}
        background={background}
      >
      </TitleDiscription>
      <WritingsSnapscroll />
    </div> 

  )
}