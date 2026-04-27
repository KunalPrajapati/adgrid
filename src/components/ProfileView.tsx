import { useState } from 'react';
import { ChefHat, MapPin, Phone, Mail, Star, Camera, Edit3, Save, X } from 'lucide-react';

const initialProfile = {
  name: 'Spice Route',
  tagline: 'Authentic Indian Cuisine',
  address: 'DLF Cyber Hub, Gurugram, Haryana',
  phone: '+91 98765 43210',
  email: 'contact@spiceroute.in',
  hours: '11 AM - 11 PM',
  cuisine: 'Indian, Mughlai',
  capacity: '80 guests',
  established: '2018',
};

export default function ProfileView() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);

  const save = () => { setProfile(draft); setEditing(false); };
  const cancel = () => { setDraft(profile); setEditing(false); };

  const field = (key: keyof typeof draft, _label: string) => (
    editing ? (
      <input
        value={draft[key]}
        onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
        className="text-sm font-medium text-slate-900 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500/30 w-full"
      />
    ) : (
      <p className="text-sm font-medium text-slate-900">{profile[key]}</p>
    )
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Restaurant Profile</h2>
        <p className="text-slate-500 mt-1 text-sm sm:text-base">Manage your restaurant information</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 relative rounded-t-2xl">
          <button className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-2 rounded-lg text-white hover:bg-white/30 transition">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className="px-4 sm:px-6 pb-6 relative z-10">
          {/* Avatar row — on mobile stacks vertically after the avatar */}
          <div className="flex items-end gap-4 -mt-12 mb-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white p-1 rounded-2xl shadow-lg flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <ChefHat className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
            <div className="flex-1 pb-1 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                {editing ? (
                  <input
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    className="text-xl sm:text-2xl font-bold text-slate-900 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500/30 w-full"
                  />
                ) : (
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{profile.name}</h3>
                )}
                <p className="text-slate-500 text-sm">{profile.tagline}</p>
              </div>
              <div className="flex gap-2">
                {editing ? (
                  <>
                    <button onClick={cancel} className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
                      <X className="w-4 h-4" /> Cancel
                    </button>
                    <button onClick={save} className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                      <Save className="w-4 h-4" /> Save
                    </button>
                  </>
                ) : (
                  <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">
                    <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Contact Information</p>
              <div className="space-y-3">
                {[
                  { icon: MapPin, label: 'Address', key: 'address' as const },
                  { icon: Phone, label: 'Phone', key: 'phone' as const },
                  { icon: Mail, label: 'Email', key: 'email' as const },
                ].map(({ icon: Icon, label, key }) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-500">{label}</p>
                      {field(key, label)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Business Details</p>
              <div className="space-y-2">
                {[
                  { label: 'Operating Hours', key: 'hours' as const },
                  { label: 'Cuisine Type', key: 'cuisine' as const },
                  { label: 'Seating Capacity', key: 'capacity' as const },
                  { label: 'Established', key: 'established' as const },
                ].map(({ label, key }) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg gap-4">
                    <span className="text-sm text-slate-600 flex-shrink-0">{label}</span>
                    {editing ? (
                      <input
                        value={draft[key]}
                        onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                        className="text-sm font-semibold text-slate-900 border border-slate-200 rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-orange-400 text-right"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-slate-900">{profile[key]}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-5 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <div>
                <p className="font-bold text-slate-900">4.7 / 5.0</p>
                <p className="text-xs text-slate-600">Based on 1,284 reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
