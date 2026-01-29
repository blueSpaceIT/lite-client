import Container from "../../../../../components/common/Container/Container";
import TitleCardTwo from "../../../../../components/common/TitleCardTwo/TitleCardTwo";
import galleryImg from "/gallery.jpg";

const GallerySection = () => {
    return (
        <div className="py-6 lg:py-8 my-5">
            <Container>
                <TitleCardTwo text="গ্যালারি" />

                <div className="mt-3 lg:mt-5">
                    <img src={galleryImg} alt="" />
                </div>
            </Container>
        </div>
    );
};

export default GallerySection;
