// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// const courses = [

//     {
//         "title": "Web Development Tutorials",
//         "description": "Welcome to the Sigma Web Development Course - Web Development Tutorials in Hindi playlist!",
//         "image": "/images/web-dev.jpg",
//         "rating": 4.9,
//         "level": "Beginner",
//         "duration": "23 hours",
//         "lessons": "10 lessons",
//         "students": "20,000 students",
//         "tags": ["HTML", "CSS", "JavaScript"],
//         "videoId": "dQw4w9WgXcQ",
//         "videoUrl": "https://youtu.be/02umcbiswcE?si=g8s1xbCSjKlgNl0V",
//         "notes": "/notes/web-dev.pdf"
//       },
//       {
//         "title": "Generative AI Series",
//         "description": "An exciting YouTube playlist that takes you through the fascinating world of generative artificial intelligence.",
//         "image": "/images/gen-ai.jpg",
//         "rating": 4.5,
//         "level": "Intermediate",
//         "duration": "8 hours",
//         "lessons": "5 lessons",
//         "students": "150,000 students",
//         "tags": ["CHAT GPT", "Open AI", "Generative AI"],
//         "videoId": "3JZ_D3ELwOQ",
//         "videoUrl": "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
//         "notes": "/notes/gen-ai.pdf"
//       },
//       {
//         "title": "Flutter Development Bootcamp",
//         "description": "Get started with Flutter development with this comprehensive bootcamp.",
//         "image": "/images/flutter.jpg",
//         "rating": 4.7,
//         "level": "Beginner",
//         "duration": "30 hours",
//         "lessons": "5 lessons",
//         "students": "58,000 students",
//         "tags": ["Flutter"],
//         "videoId": "abcd1234",
//         "videoUrl": "https://www.youtube.com/watch?v=abcd1234",
//         "notes": "/notes/flutter.pdf"
//       },
//       {
//           "title": "Web Development Tutorials",
//           "description": "Welcome to the Sigma Web Development Course - Web Development Tutorials in Hindi playlist!",
//           "image": "/images/web-dev.jpg",
//           "rating": 4.9,
//           "level": "Beginner",
//           "duration": "23 hours",
//           "lessons": "10 lessons",
//           "students": "20,000 students",
//           "tags": ["HTML", "CSS", "JavaScript"],
//           "videoId": "dQw4w9WgXcQ",
//           "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//           "notes": "/notes/web-dev.pdf"
//         },
//         {
//           "title": "Generative AI Series",
//           "description": "An exciting YouTube playlist that takes you through the fascinating world of generative artificial intelligence.",
//           "image": "/images/gen-ai.jpg",
//           "rating": 4.5,
//           "level": "Intermediate",
//           "duration": "8 hours",
//           "lessons": "5 lessons",
//           "students": "150,000 students",
//           "tags": ["CHAT GPT", "Open AI", "Generative AI"],
//           "videoId": "3JZ_D3ELwOQ",
//           "videoUrl": "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
//           "notes": "/notes/gen-ai.pdf"
//         },
//         {
//           "title": "Flutter Development Bootcamp",
//           "description": "Get started with Flutter development with this comprehensive bootcamp.",
//           "image": "/images/flutter.jpg",
//           "rating": 4.7,
//           "level": "Beginner",
//           "duration": "30 hours",
//           "lessons": "5 lessons",
//           "students": "58,000 students",
//           "tags": ["Flutter"],
//           "videoId": "abcd1234",
//           "videoUrl": "https://www.youtube.com/watch?v=abcd1234",
//           "notes": "/notes/flutter.pdf"
//         },
//         {
//           "title": "Web Development Tutorials",
//           "description": "Welcome to the Sigma Web Development Course - Web Development Tutorials in Hindi playlist!",
//           "image": "/images/web-dev.jpg",
//           "rating": 4.9,
//           "level": "Beginner",
//           "duration": "23 hours",
//           "lessons": "10 lessons",
//           "students": "20,000 students",
//           "tags": ["HTML", "CSS", "JavaScript"],
//           "videoId": "dQw4w9WgXcQ",
//           "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//           "notes": "/notes/web-dev.pdf"
//         },
//         {
//           "title": "Generative AI Series",
//           "description": "An exciting YouTube playlist that takes you through the fascinating world of generative artificial intelligence.",
//           "image": "/images/gen-ai.jpg",
//           "rating": 4.5,
//           "level": "Intermediate",
//           "duration": "8 hours",
//           "lessons": "5 lessons",
//           "students": "150,000 students",
//           "tags": ["CHAT GPT", "Open AI", "Generative AI"],
//           "videoId": "3JZ_D3ELwOQ",
//           "videoUrl": "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
//           "notes": "/notes/gen-ai.pdf"
//         },
//         {
//           "title": "Flutter Development Bootcamp",
//           "description": "Get started with Flutter development with this comprehensive bootcamp.",
//           "image": "/images/flutter.jpg",
//           "rating": 4.7,
//           "level": "Beginner",
//           "duration": "30 hours",
//           "lessons": "5 lessons",
//           "students": "58,000 students",
//           "tags": ["Flutter"],
//           "videoId": "abcd1234",
//           "videoUrl": "https://www.youtube.com/watch?v=abcd1234",
//           "notes": "/notes/flutter.pdf"
//         },
     
// ];

// export default function CoursesPage() {
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [filter, setFilter] = useState("All");

//   const filteredCourses = filter === "All" ? courses : courses.filter(course => course.tags.includes(filter));

//   return (
//     <div className="p-6 alig min-h-screen text-white">
//       {selectedCourse ? (
//         <CourseDetail course={selectedCourse} onBack={() => setSelectedCourse(null)} />
//       ) : (
//         <>
//           <h2 className="text-3xl font-bold mb-6 text-center">Courses</h2>
//           <div className="mb-4 text-center">
//             <select 
//               className="p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
//               onChange={(e) => setFilter(e.target.value)}
//               value={filter}
//             >
//               <option value="All">All</option>
//               <option value="HTML">HTML</option>
//               <option value="CSS">CSS</option>
//               <option value="JavaScript">JavaScript</option>
//               <option value="Flutter">Flutter</option>
//               <option value="Cyber Security">Cyber Security</option>
//               <option value="CHAT GPT">CHAT GPT</option>
//             </select>
//           </div>
//           <div className="grid md:grid-cols-3 gap-6">
//             {filteredCourses.map((course, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//                 onClick={() => setSelectedCourse(course)}
//               >
//                 <Image src={course.image} alt={course.title} width={400} height={250} className="rounded-lg" />
//                 <div className="mt-4">
//                   <h3 className="text-xl font-bold">{course.title}</h3>
//                   <p className="text-sm text-gray-400">{course.description}</p>
//                   <div className="flex items-center justify-between mt-3">
//                     <span className="text-yellow-400 font-semibold">{course.rating} ⭐</span>
//                     <span className="text-sm bg-blue-600 px-2 py-1 rounded-full">{course.level}</span>
//                   </div>
//                   <p className="text-sm text-gray-300 mt-2">{course.duration} • {course.lessons} • {course.students}</p>
//                   <div className="mt-3 flex flex-wrap gap-2">
//                     {course.tags.map((tag, idx) => (
//                       <span key={idx} className="text-xs bg-gray-700 px-2 py-1 rounded-md">{tag}</span>
//                     ))}
//                   </div>
//                   <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300">
//                     Start Now
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// function CourseDetail({ course, onBack }) {
//   return (
//     <div className="p-6 min-h-screen text-white">
//       <button onClick={onBack} className="mb-4 text-blue-500">Back to Courses</button>
//       <h2 className="text-3xl font-bold mb-6">{course.title}</h2>
//       <div className="flex flex-col items-center">
//         <iframe
//           width="800"
//           height="450"
//           src={`https://www.youtube.com/embed/${course.videoId}`}
//           title="YouTube video player"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//           className="rounded-lg shadow-lg"
//         ></iframe>
//         <p className="mt-4 text-gray-300">{course.description}</p>
//         <a href={course.notes} download>
//           <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300">
//             Download Notes
//           </button>
//         </a>
//       </div>
//     </div>
//   );
// }



