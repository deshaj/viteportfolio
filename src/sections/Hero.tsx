import ProfileCard from './hero/Profile';
import MusicPlayer from './hero/Music';

export default function Hero() {
  return (
    <section 
      id="home" 
      className="w-full flex justify-center pt-36 pb-8 px-6"
    > 
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mx-auto">
        
        <div className="md:col-span-7 h-full">
          <ProfileCard />
        </div>

        <div className="md:col-span-5 h-full">
          <MusicPlayer />
        </div>

      </div>
    </section>
  );
}