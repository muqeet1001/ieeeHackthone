export default function Venue() {
  return (
    <section className="h-96 w-full relative group" id="venue">
      <img
        alt="Tech Event Venue"
        className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-700"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOsBO3N797AtKu5373yB0HreIgZ3bGzqUUj_9BQbhwVqWrcdoID_EPhUdF-INqI5EKrfS1wyCXN3BCamSTmgXknlqiW3omfmc8R8AI55sylga9dLQO0v_sZogNpc9ybGx0Dhx3jwjpbJhTwDzbzgcJ6efD46SVmAU3pZCAeBnNlPlj03ZeF5nDd3r_MGwhgAkmMq6QlFCzxXNkVLKgo5kVwx-wuix3PUJRPzrpBgBKhzY5QHuaeZKPmdgX78YtQueDqfBBN3lDM-o"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-surface/80 backdrop-blur-md p-8 border border-outline-variant text-center max-w-lg mx-6">
          <span className="material-symbols-outlined text-secondary text-5xl mb-4">location_on</span>
          <h3 className="font-headline text-3xl font-bold uppercase mb-2">HKBK COLLEGE OF ENGINEERING</h3>
          <p className="text-on-surface-variant font-body">Survey No. 22/1, Opp. Manyata Tech Park, Nagawara, Bangalore, Karnataka 560045</p>
          <a className="inline-block mt-6 text-tertiary font-label font-bold tracking-widest text-sm hover:text-primary underline" href="#">OPEN IN MAPS</a>
        </div>
      </div>
    </section>
  );
}
