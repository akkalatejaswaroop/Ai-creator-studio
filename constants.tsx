
import React from 'react';
import { Tool, ToolCategory, ToolComponentType } from './types';

// SVG Icons
const PenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const MegaphoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.514C18.358 1.84 19.17 1 20.243 1c.67 0 1.313.327 1.745.87l.271.305a1.5 1.5 0 010 2.118l-6.195 6.195a2.25 2.25 0 01-3.183 0l-1.42-1.42a2.25 2.25 0 00-3.182 0l-1.42 1.42a2.25 2.25 0 000 3.182l.026.026a2.25 2.25 0 003.182 0l1.42-1.42" /></svg>;
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const GraduationCapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v5a2 2 0 002 2h18a2 2 0 002-2v-5" /></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const BugIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-3-5v5m-3-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const DocumentTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const MagnifyingGlassIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const LightbulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const CogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const PresentationChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>;
const QuestionMarkCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ClipboardListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6.343 6.343l-2.828 2.829M17.657 17.657l2.828 2.829M18 5v.01M19.071 6.929l-2.829 2.829M12 2v2m-6.857 4.929l-2.829-2.829M21 12h-2m.465 6.464l-2.829-2.829M12 18v2m3.636-3.636l2.828-2.829" /></svg>;
const UserCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14a7 7 0 100-14 7 7 0 000 14z" /></svg>;
const ChatBubbleLeftRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a1.125 1.125 0 01-1.59 0l-3.72-3.72c-1.133-.093-1.98-1.057-1.98-2.193V10.608c0-.97.616-1.813 1.5-2.097m0 0A7.496 7.496 0 0012 8a7.496 7.496 0 00-6.75 4.511m0 0c.884-.284 1.5-1.128 1.5-2.097V6.286c0-1.136.847-2.1 1.98-2.193l3.72-3.72a1.125 1.125 0 011.59 0l3.72 3.72c1.133.093 1.98 1.057 1.98 2.193v4.322c0 .97-.616 1.813-1.5 2.097" /></svg>;
const EnvelopeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const PhotoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const DatabaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>;
const FilmIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>;
const HashtagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2-2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ClipboardCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
const CheckBadgeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;
const AdjustmentsHorizontalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6h9m-9 6h6m-6 6h3m-9-6a3 3 0 11-6 0 3 3 0 016 0zM6 6a3 3 0 10-6 0 3 3 0 006 0zM6 18a3 3 0 10-6 0 3 3 0 006 0z" /></svg>;
const ArrowsPointingOutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>;
const DocumentDuplicateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const TagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.25l-6.18 3.77L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
const RectangleStackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2-2H6a2 2 0 01-2-2V6zm14 0H6v12h12V6zM4 9h16M4 12h16M4 15h16" /></svg>;
const MusicalNoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-16l-3.328 1.11a2 2 0 00-1.672 1.89V19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>;
const ArrowPathIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l16 16m0-16L4 20" /></svg>;
const ServerStackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18" /></svg>;
const WrenchScrewdriverIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.474-4.474c.036-.58.016-1.193-.14-1.743m-4.868 5.108c-.384-.115-.796-.188-1.213-.233m-4.868 5.108l-3.03-2.496m-4.655 5.653l5.653-4.655" /></svg>;
const ChartPieIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>;
const RocketLaunchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const BeakerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 01.547-1.806z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const GitCommitIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3m-3 12h3m-6-6h9M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" /></svg>;
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>;
const MapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.5-10.5h.75a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25-2.25h-7.5a2.25 2.25 0 01-2.25-2.25V8.25a2.25 2.25 0 012.25-2.25h.75" /></svg>;
// New Icons for File Utilities
const FileDocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const ArrowDownOnSquareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3v11.25" /></svg>;
const ArrowsRightLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>;
const DocumentPlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const ScissorsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536 1.536m-1.536-1.536l6.364 6.364m-7.9 0l6.364-6.364m-1.536 1.536l1.536-1.536M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm-3.375 0h.008v.008h-.008V6.375zm10.5 8.25a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm-3.375 0h.008v.008h-.008v-.008z" /></svg>;


export const CATEGORIES: ToolCategory[] = [
  ToolCategory.Writing,
  ToolCategory.Business,
  ToolCategory.Marketing,
  ToolCategory.Learning,
  ToolCategory.Research,
  ToolCategory.Creative,
  ToolCategory.Coding,
  ToolCategory.Engineering,
  ToolCategory.Professional,
  ToolCategory.FileUtilities,
];

export const TOOLS: Tool[] = [
  // --- Writing ---
  {
    id: 'blog-post',
    name: 'Blog Post Generator',
    description: 'Create engaging, SEO-friendly blog posts on any topic.',
    category: ToolCategory.Writing,
    icon: <PenIcon />,
    component: ToolComponentType.BlogPost,
    systemInstruction: 'You are an expert copywriter, SEO specialist, and content strategist. Your goal is to write a compelling, well-structured, and SEO-friendly blog post based on the user\'s topic, keywords, tone, style, and target audience. The output should be comprehensive, including SEO metadata and related social media posts. Where appropriate, enrich the content with relevant data or conceptual quotes. The output MUST be in Markdown format.',
    props: {
      promptTemplate: 'Write a blog post about the following topic or text: "{userInput}".\n\nOptional Keywords for guidance: {keywords}\nRequested Tone: {tone}\nRequested Style: {style}\nTarget Audience: {audience}\n\nThe output must be a single block of text in Markdown format and include the following clearly labeled sections in order:\n\n1.  **SEO Title:** (A compelling title around 60 characters)\n2.  **Meta Description:** (An engaging summary around 160 characters)\n3.  **SEO Keywords:** (A comma-separated list of 10-15 relevant keywords based on the content)\n4.  **Blog Post Body:** (The full article, with a catchy title using a H1 tag (`#`), introduction, several body paragraphs with subheadings using H2 tags (`##`), and a strong conclusion. It must be written for a {audience} audience in a {tone}, {style} manner.)\n5.  **Related Social media Posts:** (Two short posts, one for Twitter/X and one for LinkedIn, to promote the article.)',
      placeholder: 'e.g., The future of AI in marketing. You can also paste a long article here to have it summarized and rewritten as a blog post.',
      tones: ['Formal', 'Conversational', 'Technical', 'Humorous', 'Persuasive'],
      styles: ['News Report', 'How-To Guide', 'Listicle', 'Opinion Piece', 'Case Study'],
      audiences: ['General Public', 'Industry Experts', 'Beginners', 'Students'],
    },
    context: {
      purpose: "Generates full-length blog articles from a single topic idea, complete with SEO metadata and social media snippets.",
      benefit: "Saves hours of writing time, overcomes writer's block, produces SEO-optimized content, and provides promotional material in one go.",
      proFeature: "Paste a long article or transcript into the main input to have it summarized and restructured into a polished blog post."
    }
  },
  {
    id: 'grammar-fixer',
    name: 'Grammar & Style Fixer',
    description: 'Correct grammar and improve the style and clarity of your writing.',
    category: ToolCategory.Writing,
    icon: <CheckBadgeIcon />,
    component: ToolComponentType.GrammarTool,
    systemInstruction: 'You are an expert copy editor. Your task is to correct grammar and spelling, and rewrite the provided text to match a specified style. You should also improve sentence clarity and conciseness, and enhance vocabulary. Present the corrected text first, followed by a bulleted list explaining the key changes (Grammar, Style, Vocabulary, Clarity). Use Markdown for formatting.',
    props: {
      promptTemplate: 'Please correct the grammar and rewrite the following text in a {style} style. Improve its clarity and vocabulary. Text: {userInput}',
      placeholder: 'Paste any text here to check for errors and get style suggestions...',
      styles: ['Formal', 'Casual', 'Technical', 'Creative', 'Academic'],
    },
    context: {
      purpose: 'Checks your text for grammatical errors, spelling mistakes, and stylistic issues.',
      benefit: 'Ensures your writing is professional, clear, and error-free, whether it\'s for an email, a report, or a blog post.',
      proFeature: 'Select a target style (e.g., "Formal") to not only correct errors but also align the text with a specific voice.'
    }
  },
   {
    id: 'tone-changer',
    name: 'Writing Tone Changer',
    description: 'Rewrite your text to adopt a different tone, such as professional, casual, or confident.',
    category: ToolCategory.Writing,
    icon: <AdjustmentsHorizontalIcon />,
    component: ToolComponentType.ToneChangerTool,
    systemInstruction: 'You are an expert editor and communication specialist. Your task is to rewrite the given text to match the specified tone and intensity, while preserving the core message.',
    props: {
      promptTemplate: 'Rewrite the following text with a {intensity} {tone} tone: {userInput}',
      placeholder: 'Paste the text you want to transform here...',
      tones: ['Professional', 'Friendly', 'Persuasive', 'Humorous', 'Empathetic', 'Confident'],
      intensities: ['Mild', 'Moderate', 'Strong'],
    },
    context: {
      purpose: 'Modifies the tone of your writing to suit different audiences and situations.',
      benefit: 'Helps you communicate more effectively by ensuring your message has the right emotional impact, from a formal business proposal to a friendly social media post.',
      proFeature: 'Use the intensity control to fine-tune the strength of the selected tone for more nuanced results.'
    }
  },
  {
    id: 'paragraph-rephraser',
    name: 'Paragraph Rephraser',
    description: 'Rephrase sentences and paragraphs to improve clarity and avoid repetition.',
    category: ToolCategory.Writing,
    icon: <ArrowsPointingOutIcon />,
    component: ToolComponentType.SingleSelectTool,
    systemInstruction: 'You are a skilled writer and editor. Your task is to rephrase the given paragraph based on a specific goal (e.g., improving clarity, making it more concise, or boosting creativity). You must preserve the original meaning. Provide a few different versions if possible, using Markdown for formatting.',
    props: {
      promptTemplate: 'Please rephrase the following paragraph with the goal of making it more "{selectValue}". Provide 2-3 alternative versions. Paragraph: {userInput}',
      placeholder: 'Paste a sentence or paragraph here to get alternative phrasings...',
      select: {
        label: 'Rephrasing Goal',
        options: ['Clarity', 'Conciseness', 'Creativity', 'Formality'],
      },
    },
    context: {
      purpose: 'Rewrites your text to say the same thing in a different way.',
      benefit: 'Helps you avoid plagiarism, improve sentence variety, find more powerful ways to express your ideas, and overcome writer\'s block.',
      proFeature: 'Use the "Rephrasing Goal" selector to control the style of the output, whether you need to simplify text or make it more creative.'
    }
  },
  {
    id: 'ai-humanizer',
    name: 'AI Text Humanizer',
    description: 'Rewrite AI-generated text to sound more natural and human-like.',
    category: ToolCategory.Writing,
    icon: <SparklesIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an expert editor specializing in refining AI-generated text. Your task is to revise the given text to make it sound more natural, engaging, and less robotic. Focus on varying sentence structure, using more vivid language, adding idiomatic expressions, improving the logical flow, and adopting a more conversational and authentic human tone.',
    props: {
      promptTemplate: 'Please rewrite the following text to make it sound more human, with varied sentence structure and more natural language flow. Original text: {userInput}',
      placeholder: 'Paste the AI-generated text you want to humanize...',
    },
    context: {
      purpose: "Refines robotic-sounding AI text to be more natural and engaging.",
      benefit: "Improves readability and authenticity of content, making it connect better with human readers and avoid AI detection.",
      proFeature: "Specify a target audience (e.g., 'rewrite this for a young, tech-savvy audience') to tailor the tone."
    }
  },
  {
    id: 'email-writer',
    name: 'Professional Email Writer',
    description: 'Draft professional emails for situations like outreach, follow-ups, or formal requests.',
    category: ToolCategory.Writing,
    icon: <EnvelopeIcon />,
    component: ToolComponentType.EmailWriterTool,
    systemInstruction: 'You are a professional communications expert. Your task is to write a clear, concise, and professional email based on the user\'s objective and desired politeness level. The email must include a clear subject line, a concise body with a clear call-to-action, and a professional closing. The user may specify a custom salutation or sign-off.',
    props: {
        promptTemplate: 'Write a professional email for the following purpose with a {politeness} politeness level: {userInput}. The email should have a clear subject line, a concise body with a strong call-to-action, and a professional closing.',
        placeholder: 'e.g., Follow up on a job application, or request a meeting with a potential client. You can specify a sign-off like "End with Regards,"',
        politenessLevels: ['Formal', 'Neutral', 'Friendly'],
    },
    context: {
        purpose: "Generates well-structured professional emails for any situation.",
        benefit: "Saves time and ensures your communication is professional and effective, improving response rates.",
        proFeature: "Use the politeness level control to perfectly match the tone of your email to the recipient and context."
    }
  },
  {
    id: 'argument-builder',
    name: 'Persuasive Argument Builder',
    description: 'Structure a compelling argument with an introduction, key points, and a conclusion.',
    category: ToolCategory.Writing,
    icon: <MegaphoneIcon />,
    component: ToolComponentType.SingleSelectTool,
    systemInstruction: 'You are a master debater and rhetoric expert. Your task is to structure a persuasive argument based on a given topic and stance, tailored to a specific tone. You should integrate evidence or examples where appropriate. Use Markdown for structure.',
    props: {
        promptTemplate: 'Create a persuasive argument for the following topic/stance: {userInput}. The argument should have an "{selectValue}" tone and include an introduction, three distinct supporting points with brief explanations or examples, and a strong concluding statement.',
        placeholder: 'e.g., The importance of renewable energy, or why remote work is the future',
        select: {
          label: 'Argument Tone',
          options: ['Assertive', 'Balanced', 'Empathetic', 'Analytical'],
        }
    },
    context: {
        purpose: "Outlines a strong, logical argument for any topic.",
        benefit: "Helps you organize your thoughts, write convincing essays, prepare for debates, or craft persuasive presentations.",
        proFeature: "Ask it to include a counter-argument and a rebuttal to make your position even stronger."
    }
  },
  {
    id: 'meeting-summarizer',
    name: 'Meeting Summarizer',
    description: 'Turn a messy meeting transcript into a concise summary with action items.',
    category: ToolCategory.Writing,
    icon: <DocumentDuplicateIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a professional executive assistant. Your task is to read a meeting transcript and produce a concise summary. The summary must include a list of attendees, key discussion points, decisions made, and a clearly labeled "Action Items" section with assigned owners. Use Markdown formatting.',
    props: {
      promptTemplate: 'Summarize the following meeting transcript, extracting attendees, key points, decisions, and action items:\n\n{userInput}',
      placeholder: 'Paste the full meeting transcript here...',
    },
    context: {
      purpose: "Distills long meeting transcripts into clear, actionable summaries.",
      benefit: "Saves time by quickly highlighting decisions and next steps, ensuring everyone is aligned and accountable.",
      proFeature: "Specify if certain attendees are guests or key stakeholders in the prompt for a more nuanced summary."
    }
  },
  {
    id: 'dialogue-writer',
    name: 'Fictional Dialogue Writer',
    description: 'Create natural and engaging dialogue between two or more characters.',
    category: ToolCategory.Writing,
    icon: <ChatBubbleLeftRightIcon />,
    component: ToolComponentType.DoubleSelectTool,
    systemInstruction: 'You are an experienced novelist and screenwriter. Your task is to write a short scene of dialogue based on the user\'s prompt, genre, and mood. The dialogue should be natural, reflect the characters\' personalities, and move the plot forward.',
    props: {
      promptTemplate: 'Write a dialogue scene for the "{select1}" genre with a "{select2}" mood, based on the following: {userInput}',
      placeholder: 'e.g., Two characters, a veteran detective and a rookie cop, are arguing about a case in a coffee shop.',
      select1: {
        label: 'Genre',
        options: ['Sci-Fi', 'Fantasy', 'Thriller', 'Romance', 'Comedy', 'Drama'],
      },
      select2: {
        label: 'Mood',
        options: ['Tense', 'Humorous', 'Romantic', 'Somber', 'Action-packed'],
      },
    },
    context: {
      purpose: "Generates realistic and compelling conversations for stories or scripts.",
      benefit: "Helps writers develop character voice, advance their plot through interaction, and overcome writer's block when crafting dialogue.",
      proFeature: "Specify a subtext for the conversation, like 'one character is lying' or 'there is unspoken romantic tension'."
    }
  },
   {
    id: 'speech-writer',
    name: 'Speech & Presentation Writer',
    description: 'Generate a full script for a speech or presentation.',
    category: ToolCategory.Writing,
    icon: <PresentationChartBarIcon />,
    component: ToolComponentType.SingleSelectTool,
    systemInstruction: 'You are a professional speechwriter and presentation coach. Your task is to generate a full script based on a topic, audience, and desired length. The script must have a strong opening hook, a clear structure with 3-5 key points, and a memorable conclusion. Use Markdown for formatting.',
    props: {
      promptTemplate: 'Write a speech script for the following topic: {userInput}. The target audience is {selectValue}. The script should include an attention-grabbing intro, key talking points, and a powerful conclusion.',
      placeholder: 'e.g., The future of sustainable energy',
      select: {
        label: 'Audience',
        options: ['General Public', 'Industry Experts', 'High School Students', 'Company Executives'],
      }
    },
    context: {
      purpose: 'Writes a complete, structured script for a talk or presentation.',
      benefit: 'Saves hours of preparation time, helps you structure your thoughts logically, and provides a polished script to practice and deliver with confidence.',
      proFeature: 'Specify a desired time length (e.g., "for a 10-minute talk") to get a script that is paced appropriately.'
    }
  },
  {
    id: 'brand-voice-guide',
    name: 'Brand Voice Guide Creator',
    description: "Generate a brand voice guide defining your company's tone, vocabulary, and style.",
    category: ToolCategory.Writing,
    icon: <MegaphoneIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: "You are a senior brand strategist. Your task is to create a brand voice guide based on a user's description. The guide should be in Markdown format and include sections for: Brand Personality (3-5 adjectives), Tone of Voice (with do's and don'ts), Vocabulary (words to use/avoid), and Grammar/Style rules.",
    props: {
        promptTemplate: "Create a detailed brand voice guide for a brand with the following characteristics: '{userInput}'. Include sections for Personality, Tone, Vocabulary, and Grammar.",
        placeholder: "e.g., A playful but trustworthy fintech app targeting millennials.",
    },
    context: {
        purpose: "Creates a document that defines your brand's communication style.",
        benefit: "Ensures consistency across all your marketing and communication, strengthening your brand identity and building trust with your audience.",
        proFeature: "Provide examples of your existing copy and ask the AI to 'reverse-engineer a brand voice guide based on this text'."
    }
  },
  // --- Business & Marketing ---
  {
    id: 'market-research-assistant',
    name: 'Market Research Assistant',
    description: 'Get up-to-date market analysis and competitor info with cited sources.',
    category: ToolCategory.Business,
    icon: <ChartPieIcon />,
    component: ToolComponentType.GroundedQA,
    systemInstruction: 'You are a senior market research analyst. Provide a detailed, data-driven answer to the user\'s question using the latest information from the web. Synthesize the information into a coherent summary.',
    props: {
      placeholder: 'e.g., What are the current market trends for sustainable packaging?',
    },
    context: {
      purpose: "Answers business intelligence questions using the latest information from Google Search.",
      benefit: "Provides quick, reliable insights on market trends, competitors, and industry news, complete with sources, to inform strategic decisions.",
      proFeature: "Ask it to 'Summarize the top 3 competitors for a product like Slack' to get a quick competitive landscape overview."
    }
  },
  {
    id: 'swot-analysis',
    name: 'SWOT Analysis Generator',
    description: 'Generate a Strengths, Weaknesses, Opportunities, and Threats analysis.',
    category: ToolCategory.Business,
    icon: <ArrowsPointingOutIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a senior business strategist. Your task is to generate a comprehensive SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis for a given company, product, or idea. The output must be in Markdown format, with each of the four sections clearly labeled and containing at least 3-4 insightful bullet points.',
    props: {
      promptTemplate: 'Generate a SWOT analysis for the following company/product/idea: {userInput}',
      placeholder: 'e.g., Tesla, a new coffee shop in a college town, or the concept of a subscription box for board games',
    },
    context: {
      purpose: "Creates a structured SWOT analysis for any business or idea.",
      benefit: "Provides a foundational strategic planning document that helps in decision-making, identifying competitive advantages, and uncovering potential risks.",
      proFeature: "Specify a particular market (e.g., 'in the European market') to get a more context-aware analysis of Opportunities and Threats."
    }
  },
  {
    id: 'content-calendar',
    name: 'Content Calendar Planner',
    description: 'Generate a one-month content calendar with themes, post ideas, and formats.',
    category: ToolCategory.Business,
    icon: <CalendarIcon />,
    component: ToolComponentType.SingleSelectTool,
    systemInstruction: "You are a senior content strategist. Your task is to generate a one-month content calendar based on a topic and target platform. The calendar should include weekly themes, daily post ideas, suggested formats (e.g., article, poll, video), and relevant hashtags. The output should be in a structured Markdown table format.",
    props: {
        promptTemplate: "Generate a one-month content calendar for the topic '{userInput}' on the platform '{selectValue}'. The calendar should include weekly themes, daily post ideas with suggested formats, and hashtags.",
        placeholder: "e.g., The benefits of remote work for small businesses",
        select: {
          label: "Target Platform",
          options: ['LinkedIn', 'Twitter/X', 'Instagram', 'Blog'],
        }
    },
    context: {
        purpose: "Creates a full month of content ideas based on a single topic.",
        benefit: "Eliminates the stress of content planning, ensuring a consistent and strategic presence on your chosen platform.",
        proFeature: "Specify your company's goal (e.g., 'with a goal of driving lead generation') to get a calendar tailored to business objectives."
    }
  },
  {
    id: 'business-idea-generator',
    name: 'Business Idea Generator',
    description: 'Brainstorm innovative business ideas based on a theme or industry.',
    category: ToolCategory.Business,
    icon: <RocketLaunchIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a venture capitalist and startup incubator mentor. Your task is to brainstorm three unique business ideas based on a given industry or theme. For each idea, provide a brief description, the target audience, and a potential monetization strategy. Use Markdown for formatting.',
    props: {
      promptTemplate: 'Brainstorm 3 business ideas in the following industry/theme: {userInput}',
      placeholder: 'e.g., Sustainable fashion, AI for small businesses, or pet technology'
    },
    context: {
      purpose: "Generates novel startup concepts within a specified domain.",
      benefit: "Provides aspiring entrepreneurs with creative and viable business ideas to explore, complete with a basic strategic framework.",
      proFeature: "Ask for ideas that combine two seemingly unrelated industries, like 'AI and gardening' or 'blockchain and travel'."
    }
  },
  // --- SEO & Marketing ---
  {
    id: 'social-media',
    name: 'Social Media Toolkit',
    description: 'Generate tailored posts for various social media platforms.',
    category: ToolCategory.Marketing,
    icon: <MegaphoneIcon />,
    component: ToolComponentType.SocialMedia,
    systemInstruction: 'You are a social media marketing expert. Your task is to create an engaging social media post tailored to a specific platform and tone. Include relevant hashtags and suggest trending ones if applicable.',
    props: {
      promptTemplate: 'Create a social media post for {platform} with a {tone} tone about: {userInput}. Include a caption, relevant hashtags, and a suggestion for a visual.',
      platforms: ['Instagram', 'Twitter', 'LinkedIn', 'Facebook', 'TikTok'],
      tones: ['Professional', 'Casual', 'Humorous', 'Inspirational', 'Sales-oriented'],
    },
    context: {
      purpose: "Crafts optimized posts for different social media channels.",
      benefit: "Creates platform-appropriate content quickly, increasing engagement and brand consistency across networks.",
      proFeature: "Specify a target audience in your prompt (e.g., 'Gen Z gamers') to get even more targeted content."
    }
  },
  {
    id: 'image-captioner',
    name: 'Image Caption & Alt Text',
    description: 'Generate creative captions and SEO-friendly alt text from an image.',
    category: ToolCategory.Marketing,
    icon: <CameraIcon />,
    component: ToolComponentType.ImageInput,
    systemInstruction: 'You are an expert social media manager and web accessibility specialist. Analyze the provided image and generate both an engaging, platform-aware social media caption and a descriptive, keyword-rich, SEO-friendly alt text.',
    props: {
        promptTemplate: 'Based on the image, generate a social media caption and a detailed alt text. If the user provides additional context, use it to tailor the output. Context: {userInput}',
        placeholder: '(Optional) Add context, like "Caption for an Instagram post about a new product"',
    },
    context: {
        purpose: "Creates captions and alt text by analyzing an image.",
        benefit: "Improves social media engagement and makes your website more accessible and SEO-friendly, all from a single image upload.",
        proFeature: "Add a desired tone or platform in the context box (e.g., 'A professional tone for LinkedIn') to customize the output."
    }
  },
  {
    id: 'seo-keywords',
    name: 'SEO Keyword Ideas',
    description: 'Generate a list of relevant SEO keywords for your topic.',
    category: ToolCategory.Marketing,
    icon: <MagnifyingGlassIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an SEO strategist with expertise in keyword research. Your task is to generate a comprehensive list of keywords related to a given topic. Include a mix of short-tail, long-tail, LSI (Latent Semantic Indexing) keywords, and question-based keywords. Use Markdown formatting.',
    props: {
      promptTemplate: 'Generate a list of SEO keywords for the topic: {userInput}. Organize them into categories like "Primary Keywords", "Long-Tail Questions", and "Related Concepts".',
      placeholder: 'e.g., sustainable home gardening',
    },
    context: {
      purpose: "Finds relevant keywords to improve search engine ranking.",
      benefit: "Boosts website visibility by targeting terms that users are actually searching for, driving organic traffic.",
      proFeature: "Ask for keywords for a specific intent, like 'informational keywords' or 'transactional keywords'."
    }
  },
  {
    id: 'seo-optimizer',
    name: 'SEO Content Optimizer',
    description: 'Generate SEO titles, meta descriptions, tags, and social media hashtags for your content.',
    category: ToolCategory.Marketing,
    icon: <HashtagIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an expert SEO and social media strategist. Your task is to generate a complete SEO and social media package for a given topic. The output must be well-structured with clear headings and provide on-page SEO tips. Use Markdown for formatting.',
    props: {
      promptTemplate: 'For the content topic "{userInput}", please generate the following, with each section clearly labeled:\n\n1.  **SEO Title:** (A compelling title around 60 characters)\n2.  **Meta Description:** (An engaging summary around 160 characters)\n3.  **SEO Keywords:** (A comma-separated list of 10-15 relevant keywords)\n4.  **Social Media Hashtags:**\n    - **Instagram/TikTok:** (A mix of popular and niche hashtags)\n    - **LinkedIn/Twitter:** (More professional and topic-focused hashtags)\n5. **On-Page SEO Tips:** (3 actionable tips for optimizing content on this topic)',
      placeholder: 'e.g., A guide to indoor vertical farming for beginners',
    },
    context: {
      purpose: 'Creates a full suite of SEO and social media metadata from a single topic.',
      benefit: 'Maximizes content visibility on search engines and social platforms, saving time by generating all necessary text in one go.',
      proFeature: 'Specify your target audience in the prompt (e.g., "...for a B2B audience") to get more tailored keywords and hashtags.',
    },
  },
  {
    id: 'ad-copy',
    name: 'Ad Copy Generator',
    description: 'Create compelling ad copy for platforms like Google and Facebook.',
    category: ToolCategory.Marketing,
    icon: <LightbulbIcon />,
    component: ToolComponentType.SingleSelectTool,
    systemInstruction: 'You are a direct response copywriter specializing in high-converting ad copy. Your goal is to write persuasive and attention-grabbing ad copy for a specific product or service, driven by a specific emotion.',
    props: {
      promptTemplate: 'Write 3 variations of ad copy for the following product/service, focusing on an emotion of "{selectValue}". Include a compelling headline, a short description, and a clear call-to-action for each. Product/Service: {userInput}',
      placeholder: 'e.g., A mobile app that tracks water intake',
      select: {
        label: 'Emotion to Evoke',
        options: ['Excitement', 'Urgency', 'Trust', 'Humor', 'Curiosity'],
      }
    },
    context: {
      purpose: "Writes persuasive copy for digital advertising campaigns.",
      benefit: "Increases click-through rates and conversions by crafting powerful, benefit-driven ad messages that resonate with target audiences.",
      proFeature: "Use the emotion selector to A/B test different angles for your ad campaigns."
    }
  },
  {
    id: 'ab-test-generator',
    name: 'A/B Test Idea Generator',
    description: 'Generate compelling variations of a headline or description for A/B testing.',
    category: ToolCategory.Marketing,
    icon: <BeakerIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: "You are a conversion rate optimization (CRO) specialist and copywriter. Your task is to generate several compelling variations of a headline or description for A/B testing. For each variation, explain the psychological angle behind it (e.g., urgency, social proof, benefit-driven).",
    props: {
        promptTemplate: "Generate 3-5 A/B test variations for the following headline/description: '{userInput}'. For each variation, provide the text and a brief explanation of the psychological principle it uses.",
        placeholder: "e.g., Our new app helps you manage tasks.",
    },
    context: {
        purpose: "Creates multiple versions of marketing copy to test against each other.",
        benefit: "Helps you make data-driven decisions to improve conversion rates by identifying the most effective messaging for your audience.",
        proFeature: "Provide your current conversion rate and ask for variations that are 'likely to provide the biggest lift'."
    }
  },
  {
    id: 'aida-copywriter',
    name: 'AIDA Framework Copywriter',
    description: 'Write persuasive copy using the Attention, Interest, Desire, Action framework.',
    category: ToolCategory.Marketing,
    icon: <LightbulbIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a master copywriter specializing in the AIDA (Attention, Interest, Desire, Action) marketing framework. Your task is to write persuasive copy for a product or service using this structure. Use Markdown for clear section labeling.',
    props: {
        promptTemplate: 'Write a piece of marketing copy for the following product/service using the AIDA framework: {userInput}. Clearly label the Attention, Interest, Desire, and Action sections.',
        placeholder: 'e.g., A subscription box for gourmet coffee, or a new project management software.',
    },
    context: {
        purpose: "Generates marketing copy based on a classic, proven formula.",
        benefit: "Creates structured, high-converting copy that guides the reader through a psychological journey from awareness to purchase.",
        proFeature: "Specify the target audience in your prompt (e.g., '...for busy college students') to tailor the AIDA points effectively."
    }
  },
  {
    id: 'product-description',
    name: 'Product Description Generator',
    description: 'Write compelling product descriptions for e-commerce stores that sell.',
    category: ToolCategory.Marketing,
    icon: <TagIcon />,
    component: ToolComponentType.SingleSelectTool,
    systemInstruction: 'You are an e-commerce copywriter. Your task is to write a persuasive and benefit-driven product description based on the user\'s input and a specified tone. The description should have a catchy headline, highlight key features as benefits (translating features into what they do for the customer), and use bullet points for readability. Use Markdown formatting.',
    props: {
      promptTemplate: 'Write a product description with a "{selectValue}" tone for the following product: {userInput}',
      placeholder: 'e.g., A smart water bottle that glows to remind you to drink. Made of stainless steel, has a 24-hour battery.',
      select: {
        label: 'Brand Tone',
        options: ['Professional', 'Playful', 'Luxurious', 'Minimalist', 'Technical'],
      }
    },
    context: {
      purpose: "Creates persuasive copy for e-commerce product pages.",
      benefit: "Increases sales by highlighting product benefits in a way that resonates with customers and encourages them to purchase.",
      proFeature: "Use the Brand Tone selector to ensure the copy perfectly matches your brand's voice."
    }
  },
  {
    id: 'value-proposition',
    name: 'Unique Value Proposition Creator',
    description: 'Clearly articulate what makes your product or business unique and valuable.',
    category: ToolCategory.Marketing,
    icon: <StarIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a marketing strategist and branding expert. Your task is to create a clear and compelling unique value proposition (UVP) based on a description of a product or company. The UVP should be a concise statement that explains what you do, for whom, and what makes you different from competitors.',
    props: {
      promptTemplate: 'Create a unique value proposition for the following business/product, emphasizing its key differentiators: {userInput}',
      placeholder: 'e.g., An online-only bank that offers zero fees and a high-yield savings account for millennials.',
    },
    context: {
      purpose: "Defines the core promise of value a company makes to its customers.",
      benefit: "Helps you clarify your marketing message, differentiate from competitors, and attract your ideal customer base.",
      proFeature: "Provide a list of your main competitors in the prompt to help the AI craft a more distinct value proposition."
    }
  },
  // --- Learning & Academia ---
  {
    id: 'events-researcher',
    name: 'Current Events Researcher',
    description: 'Get up-to-date information on recent events with cited sources.',
    category: ToolCategory.Learning,
    icon: <MagnifyingGlassIcon />,
    component: ToolComponentType.GroundedQA,
    systemInstruction: 'You are a research assistant. Provide a concise and accurate answer to the user\'s question based on up-to-date information from the web. Your answer should be comprehensive but to the point.',
    props: {
        placeholder: 'e.g., Who won the latest Formula 1 Grand Prix?',
    },
    context: {
        purpose: "Answers questions using the latest information from Google Search.",
        benefit: "Provides reliable answers about recent events and trending topics, complete with sources, which is something standard AI models cannot do.",
        proFeature: "Ask follow-up questions to dig deeper into a topic, just like you would with a real research assistant."
    }
  },
  {
    id: 'lecture-summary',
    name: 'Lecture Summarizer',
    description: 'Turn long lecture notes or transcripts into concise summaries.',
    category: ToolCategory.Learning,
    icon: <BookIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an academic assistant. Your task is to distill long texts into concise, easy-to-understand summaries. Use Markdown for lists and emphasis.',
    props: {
      promptTemplate: 'Summarize the following lecture notes/transcript into key bullet points and a concluding paragraph, focusing on the main concepts. Notes: {userInput}',
      placeholder: 'Paste your lecture notes or transcript here...',
    },
    context: {
      purpose: "Converts lengthy lecture notes or text into a compact summary.",
      benefit: "Quickly grasp the key points of a lecture, saving study time and making revision more efficient.",
      proFeature: "Ask it to create flashcard-style questions and answers from the notes for active recall practice."
    }
  },
  {
    id: 'study-guide',
    name: 'Study Guide Creator',
    description: 'Automatically create study guides from your course materials.',
    category: ToolCategory.Learning,
    icon: <GraduationCapIcon />,
    component: ToolComponentType.StudyTool,
    systemInstruction: 'You are a helpful study buddy. Your job is to create a comprehensive study guide from a topic or notes, tailored to a specific difficulty level. The guide should include key terms and definitions, important concepts explained simply, and practice questions with answers appropriate for the selected level. Use Markdown for structure.',
    props: {
      promptTemplate: 'Create a comprehensive study guide for a {difficulty} level based on the following topic or notes. The guide should include key terms and definitions, important concepts explained simply, and a few practice questions with answers. Topic/Notes: {userInput}',
      placeholder: 'e.g., The causes of World War I',
      difficulties: ['Beginner', 'Intermediate', 'Advanced'],
    },
    context: {
      purpose: "Generates a structured study guide from a topic or raw notes.",
      benefit: "Organizes study material into a clear and effective format, highlighting key information and improving test preparation.",
      proFeature: "Use the difficulty selector to get a guide that's either a high-level overview or a deep dive into complex details."
    }
  },
  {
    id: 'lesson-plan-generator',
    name: 'Lesson Plan Generator',
    description: 'Create structured lesson plans with objectives, activities, and assessments.',
    category: ToolCategory.Learning,
    icon: <ClipboardListIcon />,
    component: ToolComponentType.SingleSelectTool,
    systemInstruction: 'You are an experienced educator and curriculum designer. Your task is to generate a detailed and structured lesson plan based on a topic and subject. The plan should include a learning objective, materials needed, a step-by-step procedure (including an introduction, main activity, and conclusion), and a method for assessment. Use Markdown for formatting.',
    props: {
      promptTemplate: 'Generate a lesson plan for the subject "{selectValue}" on the topic "{userInput}". Include sections for Learning Objective, Materials, Procedure, and Assessment.',
      placeholder: 'e.g., Introduction to Photosynthesis, or The Pythagorean Theorem',
      select: {
        label: 'Subject Area',
        options: ['Science', 'Mathematics', 'History', 'English Language Arts', 'Art'],
      },
    },
    context: {
      purpose: "Generates structured, comprehensive lesson plans for educators.",
      benefit: "Saves teachers significant time in curriculum planning, providing a clear and effective framework for classroom instruction.",
      proFeature: "Specify a grade level in the prompt (e.g., 'for 8th-grade students') to get a more age-appropriate lesson plan."
    }
  },
  {
    id: 'homework-problem-solver',
    name: 'Homework Problem Solver',
    description: 'Get a step-by-step explanation for a complex homework problem.',
    category: ToolCategory.Learning,
    icon: <LightbulbIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a patient and knowledgeable tutor. Your task is to provide a clear, step-by-step explanation that walks the user through how to solve their homework problem. Do not just give the final answer. Focus on explaining the process, the concepts involved, and the reasoning behind each step. Use Markdown for formatting mathematical equations and code.',
    props: {
      promptTemplate: 'Provide a step-by-step explanation for how to solve the following problem: {userInput}',
      placeholder: 'Enter your homework problem here. e.g., "Solve for x in the equation 2x + 5 = 15" or "Explain how to balance the chemical equation H2 + O2 -> H2O"',
    },
    context: {
      purpose: "Provides detailed, step-by-step solutions to homework problems.",
      benefit: "Helps students understand the underlying concepts and methodology required to solve problems, rather than just getting the answer.",
      proFeature: "Ask for an explanation 'using an analogy' to better understand a difficult concept."
    }
  },
  {
    id: 'analogy-generator',
    name: 'Analogy Generator',
    description: 'Explain a complex topic using a simple, easy-to-understand analogy.',
    category: ToolCategory.Learning,
    icon: <LightbulbIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a gifted teacher who excels at making complex topics understandable through analogies. Your task is to create a simple analogy to explain a given concept.',
    props: {
        promptTemplate: 'Create a simple analogy to explain the following concept: {userInput}.',
        placeholder: 'e.g., API, Blockchain, Machine Learning, General Relativity',
    },
    context: {
        purpose: "Simplifies complex ideas using relatable comparisons.",
        benefit: "Improves learning and teaching by making difficult subjects more intuitive and memorable.",
        proFeature: "Specify the target audience for the analogy, such as 'explain it to a 10-year-old' or 'explain it to a business executive'."
    }
  },
  {
    id: 'flashcard-generator',
    name: 'Flashcard Generator',
    description: 'Create flashcards (term and definition) from your study notes.',
    category: ToolCategory.Learning,
    icon: <RectangleStackIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a study assistant. Your task is to extract key terms and their definitions from a block of text and format them as flashcards (Term: Definition).',
    props: {
      promptTemplate: 'Create flashcards from the following study notes:\n\n{userInput}',
      placeholder: 'Paste your notes here. For example: "The mitochondria is the powerhouse of the cell. It generates most of the cell\'s supply of adenosine triphosphate (ATP)."'
    },
    context: {
      purpose: "Creates digital flashcards from any block of text.",
      benefit: "Speeds up the creation of study materials and facilitates active recall, a proven method for effective learning.",
      proFeature: "Ask it to generate 'reverse' flashcards, where the definition is given and the term is the answer."
    }
  },
  {
    id: 'quiz-generator',
    name: 'Multiple Choice Quiz Generator',
    description: 'Generate a multiple-choice quiz on any topic to test your knowledge.',
    category: ToolCategory.Learning,
    icon: <QuestionMarkCircleIcon />,
    component: ToolComponentType.SingleSelectTool,
    systemInstruction: 'You are a teacher and quiz creator. Your task is to create a multiple-choice quiz based on a topic or a block of text provided by the user, tailored to a specific difficulty level. The quiz should have 5 questions, each with four options (one correct, three incorrect but plausible distractors), and an answer key at the end. Use Markdown for formatting.',
    props: {
      promptTemplate: 'Create a 5-question multiple choice quiz with "{selectValue}" difficulty on the following topic/text: {userInput}. Provide an answer key at the end.',
      placeholder: 'Enter a topic like "The American Revolution" or paste a block of text to generate a quiz from.',
      select: {
        label: 'Quiz Difficulty',
        options: ['Easy', 'Medium', 'Hard'],
      }
    },
    context: {
      purpose: "Creates practice quizzes on any subject.",
      benefit: "Helps students test their knowledge, identify areas for improvement, and prepare for exams in an interactive way.",
      proFeature: "Use the difficulty selector to create quizzes that match your current knowledge level."
    }
  },
  // --- Research & Review ---
  {
    id: 'research-abstract',
    name: 'Research Abstract Generator',
    description: 'Generate a structured abstract for a research paper.',
    category: ToolCategory.Research,
    icon: <DocumentTextIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an academic researcher and editor. Your task is to write a concise and structured abstract for a research paper based on the provided information.',
    props: {
      promptTemplate: 'Generate a research paper abstract based on the following points. The abstract should include sections for Background, Methods, Results, and Conclusion. Information: {userInput}',
      placeholder: 'Provide key points about your paper: its background, methods, results, and conclusion...',
    },
    context: {
      purpose: "Creates a formal abstract for academic papers.",
      benefit: "Saves time in drafting one of the most critical parts of a research paper, ensuring it is clear, concise, and follows standard academic structure.",
      proFeature: "Specify a word count limit (e.g., 'under 250 words') to meet journal submission guidelines."
    }
  },
  {
    id: 'literature-review',
    name: 'Literature Review Assistant',
    description: 'Generate a summary of key themes from multiple research paper abstracts.',
    category: ToolCategory.Research,
    icon: <DocumentDuplicateIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an academic researcher skilled at synthesizing information. Your task is to analyze multiple research abstracts and identify the main themes, findings, and gaps in the literature. Use Markdown formatting.',
    props: {
        promptTemplate: 'Analyze the following research abstracts and generate a summary of the key themes and findings. Abstracts: {userInput}',
        placeholder: 'Paste several research paper abstracts here, separated by a blank line...',
    },
    context: {
        purpose: "Synthesizes information from multiple research sources.",
        benefit: "Drastically speeds up the literature review process by identifying key themes and connections in the research.",
        proFeature: "After the summary, ask 'What are the main research gaps identified in these abstracts?' to guide your own research."
    }
  },
  {
    id: 'ethical-considerations-suggester',
    name: 'Ethical Considerations Suggester',
    description: 'Identify potential ethical issues for your research project.',
    category: ToolCategory.Research,
    icon: <ShieldCheckIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a senior member of an Institutional Review Board (IRB) and an expert in research ethics. Your task is to analyze a research proposal and identify potential ethical considerations. Structure your response in Markdown, with categories like Informed Consent, Confidentiality, Potential for Harm, and Data Management.',
    props: {
      promptTemplate: 'For a research study about "{userInput}", please identify and explain potential ethical considerations that a researcher should address in their IRB application.',
      placeholder: 'e.g., A study on the effects of social media on adolescent mental health',
    },
    context: {
      purpose: "Helps researchers identify potential ethical issues in their study design.",
      benefit: "Prepares researchers for the IRB application process and promotes responsible and ethical research practices.",
      proFeature: "Ask for suggestions on 'how to mitigate the identified ethical risks' to get actionable advice for your proposal."
    }
  },
  {
    id: 'conference-submission-pitch',
    name: 'Conference Submission Pitch',
    description: 'Draft a compelling pitch to submit your research abstract to a conference.',
    category: ToolCategory.Research,
    icon: <MegaphoneIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a seasoned academic who has successfully presented at many conferences. Your task is to take a research abstract and write a short, compelling pitch for a conference submission. The pitch should highlight the study\'s novelty, importance, and key finding to grab the attention of reviewers.',
    props: {
      promptTemplate: 'Write a short (150-200 words) and compelling pitch for a conference submission based on the following research abstract: {userInput}',
      placeholder: 'Paste your research abstract here...',
    },
    context: {
      purpose: "Converts a dense research abstract into a punchy and persuasive pitch.",
      benefit: "Increases the chances of your research being accepted at academic conferences by clearly communicating its value to reviewers.",
      proFeature: "Specify the conference theme or name in the prompt to get a pitch tailored to that specific event."
    }
  },
  {
    id: 'hypothesis-generator',
    name: 'Hypothesis Generator',
    description: 'Generate clear and testable hypotheses for a research topic.',
    category: ToolCategory.Research,
    icon: <LightbulbIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a research scientist specializing in experimental design. Your task is to formulate clear, specific, and testable hypotheses based on a given research area or problem statement.',
    props: {
      promptTemplate: 'Based on the research area of "{userInput}", generate 3-5 testable hypotheses. Each hypothesis should clearly state the relationship between an independent and a dependent variable.',
      placeholder: 'e.g., The effect of sleep deprivation on cognitive performance in college students',
    },
    context: {
      purpose: "Creates well-formed, testable hypotheses from a research idea.",
      benefit: "Provides a crucial starting point for any scientific study, ensuring that research questions are framed in a way that can be empirically tested.",
      proFeature: "Ask for a null hypothesis (H0) and an alternative hypothesis (H1) for each generated idea to formalize your research plan."
    }
  },
  {
    id: 'methodology-suggester',
    name: 'Research Methodology Suggester',
    description: 'Get suggestions for appropriate research methodologies for your study.',
    category: ToolCategory.Research,
    icon: <WrenchScrewdriverIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an expert in research design and methodology. Your goal is to suggest suitable methodologies for a research question, explaining the rationale behind each suggestion. Use Markdown formatting.',
    props: {
      promptTemplate: 'For a study aiming to investigate "{userInput}", suggest 2-3 appropriate research methodologies (e.g., qualitative, quantitative, mixed-methods). For each, briefly explain its suitability, potential data collection methods, and its main limitations in this context.',
      placeholder: 'e.g., The impact of remote work on employee job satisfaction and productivity',
    },
    context: {
      purpose: "Suggests appropriate scientific methods for a research question.",
      benefit: "Helps researchers select the most robust and suitable methodology for their study, strengthening the validity and reliability of their findings.",
      proFeature: "Provide your proposed methodology and ask the AI to 'critique this methodology and suggest potential improvements'."
    }
  },
  {
    id: 'peer-review-assistant',
    name: 'Peer Review Assistant',
    description: 'Get an AI-powered, constructive peer review of your academic paper.',
    category: ToolCategory.Research,
    icon: <ClipboardCheckIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an experienced academic peer reviewer. Your task is to provide balanced, constructive, and actionable feedback on a research paper draft. Structure your review with sections for "Summary," "Strengths," and "Areas for Improvement." Use Markdown formatting.',
    props: {
      promptTemplate: 'Provide a constructive peer review of the following research paper draft. Focus on clarity, methodology, originality, and the strength of the argument and evidence. Paper Draft: {userInput}',
      placeholder: 'Paste the abstract, introduction, or full draft of your research paper here...',
    },
    context: {
      purpose: "Provides a simulated peer review for an academic paper.",
      benefit: "Helps authors identify weaknesses in their manuscript before submission, improving the chances of acceptance by a journal or conference.",
      proFeature: "Ask it to review the paper from the perspective of a specific journal (e.g., 'Review this for the journal Nature')."
    }
  },
  {
    id: 'grant-proposal-ideas',
    name: 'Grant Proposal Idea Generator',
    description: 'Brainstorm innovative ideas for your next research grant proposal.',
    category: ToolCategory.Research,
    icon: <RocketLaunchIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a research funding consultant and former grant panel reviewer. Your task is to brainstorm innovative and fundable grant proposal ideas. Use Markdown for formatting.',
    props: {
      promptTemplate: 'Generate two distinct grant proposal ideas for research in the field of {userInput}. For each idea, provide a catchy title, a brief statement of the problem/gap in knowledge, a primary research objective, and a note on its potential impact.',
      placeholder: 'e.g., Neuro-computational models of decision-making, or sustainable urban agriculture',
    },
    context: {
      purpose: "Brainstorms novel and fundable research project ideas.",
      benefit: "Helps professors and researchers develop compelling grant proposals by generating initial concepts that are innovative and impactful.",
      proFeature: "Specify a funding agency's priorities (e.g., 'aligned with NIH priorities on aging') to get more targeted ideas."
    }
  },
  {
    id: 'data-analysis-plan',
    name: 'Data Analysis Plan Outline',
    description: 'Outline a statistical analysis plan for your research data.',
    category: ToolCategory.Research,
    icon: <ChartPieIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a biostatistician and data analyst. Your task is to create a logical and comprehensive data analysis plan based on a study description. Use Markdown formatting.',
    props: {
      promptTemplate: 'Outline a data analysis plan for a study with the following characteristics: {userInput}. The plan should include steps for data cleaning/preparation, descriptive statistics to be calculated, and appropriate inferential statistical tests to address the primary research question.',
      placeholder: 'Describe your study design, variables, and main research question. e.g., A study comparing test scores (continuous variable) between a control group and an experimental group (categorical variable).',
    },
    context: {
      purpose: "Creates a structured plan for how to analyze research data.",
      benefit: "Ensures that statistical analysis is planned thoughtfully in advance, which is crucial for robust research and is often required for IRB proposals and grants.",
      proFeature: "Provide your raw data (or a description of its structure) and ask 'what potential issues should I look for during data cleaning?'"
    }
  },
   // --- Creative Content ---
   {
    id: 'image-generator',
    name: 'AI Image Generator',
    description: 'Generate high-quality, unique images from a text description.',
    category: ToolCategory.Creative,
    icon: <PhotoIcon />,
    component: ToolComponentType.ImageGenerator,
    systemInstruction: '', // Not needed for image gen
    props: {
        placeholder: 'e.g., A photorealistic image of a majestic lion wearing a crown, cinematic lighting',
    },
    context: {
        purpose: "Creates original images based on your text prompts.",
        benefit: "Generate custom visuals for blog posts, social media, presentations, or creative projects without needing design skills.",
        proFeature: "Use descriptive keywords like 'photorealistic,' '4K,' 'cinematic lighting,' or 'vector art' to control the style of the generated image."
    }
  },
  {
    id: 'video-script',
    name: 'Video Script Generator',
    description: 'Create engaging scripts for YouTube, Reels, or LinkedIn videos.',
    category: ToolCategory.Creative,
    icon: <FilmIcon />,
    component: ToolComponentType.VideoScript,
    systemInstruction: 'You are a professional scriptwriter specializing in creating engaging video content for social media platforms. Your scripts should be concise, impactful, and tailored to the platform\'s style. Use Markdown formatting.',
    props: {
        promptTemplate: 'Write a script for a {style} {platform} video about "{userInput}". The script should include sections for visuals, dialogue/voiceover, and on-screen text or captions.',
        platforms: ['YouTube Short', 'Instagram Reel', 'LinkedIn Post', 'YouTube (5-min)'],
        styles: ['Informative', 'Entertaining', 'Inspirational', 'Professional'],
    },
    context: {
        purpose: "Generates structured video scripts for various platforms.",
        benefit: "Saves hours of planning and writing, helping you create polished video content that captures and holds viewer attention.",
        proFeature: "Specify a target duration in your prompt (e.g., 'a 60-second script') for a more precisely timed output."
    }
  },
  {
    id: 'book-title-generator',
    name: 'Book Title Generator',
    description: 'Generate a list of compelling and creative titles for your book.',
    category: ToolCategory.Creative,
    icon: <BookIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a creative author and marketing expert specializing in book titles. Your task is to generate a list of catchy and genre-appropriate book titles based on a user\'s idea.',
    props: {
      promptTemplate: 'Generate 10 compelling book titles for the following book idea: {userInput}. Provide a mix of different styles (e.g., intriguing, descriptive, metaphorical).',
      placeholder: 'e.g., A fantasy novel about a city powered by captured starlight.',
    },
    context: {
      purpose: 'Brainstorms a variety of potential titles for a book or story.',
      benefit: 'Helps authors overcome the challenge of titling their work by providing creative and marketable options that capture the essence of the story.',
      proFeature: 'Specify the genre and target audience (e.g., "a young adult sci-fi novel") to get more focused and appropriate title suggestions.',
    },
  },
  {
    id: 'book-outline-generator',
    name: 'Book Outline Generator',
    description: 'Create a detailed chapter-by-chapter outline for your book.',
    category: ToolCategory.Creative,
    icon: <ClipboardListIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a master storyteller and developmental editor. Your task is to create a logical and engaging chapter-by-chapter outline for a book based on the author\'s core idea. Use Markdown formatting.',
    props: {
      promptTemplate: 'Create a detailed book outline with chapter titles and a brief one-sentence summary for each chapter, based on this idea: {userInput}. The outline should follow a standard three-act structure.',
      placeholder: 'e.g., A thriller where a cryptographer must solve a series of ancient puzzles to prevent a global catastrophe.',
    },
    context: {
      purpose: 'Generates a complete chapter-by-chapter structure for a novel or non-fiction book.',
      benefit: 'Provides a solid roadmap for the writing process, ensuring a well-paced and coherent narrative, which helps prevent writer\'s block.',
      proFeature: 'Specify the desired number of chapters (e.g., "create a 20-chapter outline") for a more tailored structure.',
    },
  },
  {
    id: 'book-draft-generator',
    name: 'Story & Book Draft Generator',
    description: 'Generate a complete short story or the first chapter of your book.',
    category: ToolCategory.Creative,
    icon: <PenIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a creative and eloquent ghostwriter. Your task is to write a compelling piece of long-form narrative based on a detailed prompt. Focus on vivid descriptions, engaging dialogue, and a strong narrative voice.',
    props: {
      promptTemplate: 'Write a complete short story (or the first chapter of a book) based on the following detailed idea: {userInput}. The piece should be at least 1000 words, establishing the setting, main characters, and central conflict.',
      placeholder: 'Provide a detailed summary of your story idea, including character descriptions, setting, and the main plot points you want to cover...',
    },
    context: {
      purpose: 'Writes a substantial narrative piece, such as a full short story or an opening chapter.',
      benefit: 'Kickstarts the writing process by providing a significant chunk of text to build upon, helping to establish the tone and voice of the story.',
      proFeature: 'Provide an existing book outline (from the Outline Generator) and ask it to write a specific chapter based on the outline.',
    },
  },
  {
    id: 'story-plot',
    name: 'Story Plot Generator',
    description: 'Brainstorm compelling plot ideas and outlines for your next story.',
    category: ToolCategory.Creative,
    icon: <BookIcon />,
    component: ToolComponentType.SingleSelectTool,
    systemInstruction: 'You are a master storyteller and creative writing coach. Your goal is to generate intriguing story plots in a specific genre, with a clear beginning, middle, and end. Use Markdown formatting.',
    props: {
      promptTemplate: 'Generate a story plot outline for the "{selectValue}" genre based on the following idea. Include a protagonist, a central conflict, rising action, a climax, and a resolution. Idea: {userInput}',
      placeholder: 'e.g., A librarian who discovers a book that writes itself',
      select: {
        label: 'Genre',
        options: ['Sci-Fi', 'Fantasy', 'Mystery', 'Romance', 'Horror', 'Adventure'],
      }
    },
    context: {
      purpose: "Creates structured plot outlines for stories, novels, or screenplays.",
      benefit: "Overcomes writer's block by providing a solid foundation for your narrative, complete with key plot points and character arcs.",
      proFeature: "Use the Genre selector to get a plot structure that fits the conventions you're aiming for."
    }
  },
  {
    id: 'presentation-outline',
    name: 'Presentation Outline Creator',
    description: 'Quickly generate a structured outline for a compelling presentation.',
    category: ToolCategory.Creative,
    icon: <PresentationChartBarIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a professional presentation coach. Your task is to create a clear, logical, and engaging outline for a presentation on a given topic. Use Markdown for formatting.',
    props: {
      promptTemplate: 'Create a presentation outline for the topic: {userInput}. The outline should include an introduction with a hook, 3-5 key talking points with supporting details for each, and a strong conclusion with a call to action.',
      placeholder: 'e.g., The importance of cybersecurity for small businesses',
    },
    context: {
      purpose: "Builds a slide-by-slide outline for any presentation topic.",
      benefit: "Saves preparation time and ensures your presentation is well-structured, logical, and impactful, keeping your audience engaged.",
      proFeature: "Specify the total presentation time (e.g., 'for a 15-minute talk') to get an appropriately paced outline."
    }
  },
  {
    id: 'character-generator',
    name: 'Character Profile Generator',
    description: 'Create detailed character profiles with backstories, motivations, and personality traits.',
    category: ToolCategory.Creative,
    icon: <UserCircleIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a creative writer and character development expert. Your task is to create a rich and detailed character profile. Use Markdown for structure.',
    props: {
        promptTemplate: 'Create a detailed character profile based on this basic idea: {userInput}. Include their name, age, appearance, personality traits (including flaws), backstory, and primary motivation.',
        placeholder: 'e.g., A cynical detective who loves cats, or a young wizard afraid of their own power',
    },
    context: {
        purpose: "Fleshes out fictional characters for stories or games.",
        benefit: "Creates deep, believable characters that will resonate with your audience, adding richness to your narrative.",
        proFeature: "Add a specific context, like '...in a dystopian sci-fi setting,' to tailor the character's backstory and motivations."
    }
  },
  {
    id: 'image-prompt-enhancer',
    name: 'Image Prompt Enhancer',
    description: 'Turn a simple idea into a detailed prompt for AI image generators.',
    category: ToolCategory.Creative,
    icon: <PhotoIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an expert prompt engineer for AI image generation models like Midjourney and DALL-E. Your task is to expand a simple idea into a detailed, descriptive prompt that includes subject, style, lighting, composition, and technical details.',
    props: {
        promptTemplate: 'Expand the following simple idea into a detailed, descriptive prompt for an AI image generator: {userInput}.',
        placeholder: 'e.g., a cat in a library, or a futuristic city',
    },
    context: {
        purpose: "Creates highly descriptive prompts for AI image generators.",
        benefit: "Achieve stunning and specific visual results from AI art tools by providing them with the rich detail they need.",
        proFeature: "Specify a particular artist's style (e.g., 'in the style of Van Gogh') or a camera lens (e.g., 'shot on a 35mm lens') for more control."
    }
  },
  {
    id: 'scene-generator',
    name: 'Scene Generator',
    description: 'Write a vivid scene based on a setting, characters, and a key event.',
    category: ToolCategory.Creative,
    icon: <FilmIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a novelist and screenwriter, expert at crafting vivid and immersive scenes. Your task is to write a short scene based on the user\'s input, focusing on sensory details, dialogue, and action.',
    props: {
        promptTemplate: 'Write a short scene based on the following elements: {userInput}.',
        placeholder: 'e.g., Setting: a rainy night in a cyberpunk city. Characters: a weary detective and a nervous informant. Event: a secret is revealed.',
    },
    context: {
        purpose: "Writes a complete, descriptive scene from a basic outline.",
        benefit: "Bridges the gap between plot points, brings your story to life with immersive detail, and helps overcome writer's block.",
        proFeature: "Specify a desired mood or tone for the scene, such as 'suspenseful,' 'romantic,' or 'action-packed'."
    }
  },
  {
    id: 'lyric-generator',
    name: 'Song Lyric Generator',
    description: 'Write song lyrics in any genre, complete with verses, chorus, and a bridge.',
    category: ToolCategory.Creative,
    icon: <MusicalNoteIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a professional songwriter. Your task is to write a song based on the user\'s prompt, including a genre, theme, and mood. The song should have a clear structure (e.g., Verse 1, Chorus, Verse 2, Chorus, Bridge, Chorus).',
    props: {
      promptTemplate: 'Write a song based on the following idea: {userInput}',
      placeholder: 'e.g., A sad country song about a lost dog, or an upbeat pop song about summer vacation.',
    },
    context: {
      purpose: "Generates original song lyrics in various styles.",
      benefit: "Provides a starting point for musicians and songwriters, helping to overcome writer's block and explore new creative directions.",
      proFeature: "Provide a chord progression (e.g., G-C-D-Em) and ask the AI to write lyrics that fit the mood of those chords."
    }
  },
  {
    id: 'poem-generator',
    name: 'Poem Generator',
    description: 'Write a beautiful poem on any subject in various poetic styles.',
    category: ToolCategory.Creative,
    icon: <PenIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a celebrated poet. Your task is to write a poem based on the user\'s prompt, capturing the specified theme and mood. You can write in various styles, such as free verse, sonnet, or haiku, as requested.',
    props: {
      promptTemplate: 'Write a poem about the following: {userInput}',
      placeholder: 'e.g., A haiku about the rain, or a free verse poem about the feeling of nostalgia.',
    },
    context: {
      purpose: "Creates original poetry on any theme.",
      benefit: "Offers a creative outlet for expressing emotions and ideas, useful for writers, students, or anyone looking to craft a unique message.",
      proFeature: "Ask for a specific poetic form, like 'write a sonnet' or 'write a villanelle,' to explore classic structures."
    }
  },
  {
    id: 'prompt-engineer',
    name: 'AI Prompt Engineer',
    description: 'Craft a detailed, structured JSON prompt to get the best possible output from AI models.',
    category: ToolCategory.Creative,
    icon: <WrenchScrewdriverIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an expert AI Prompt Engineer. Your task is to take a user\'s simple idea and transform it into a highly detailed and structured JSON object that can be used as a prompt for another AI model. The JSON should break down the request into key components like persona, task, context, constraints, and output format to ensure the highest quality response.',
    props: {
        promptTemplate: 'Create a structured JSON prompt for the following idea: {userInput}. The JSON output should include keys such as "persona", "task_description", "context", "key_details", "constraints", "output_format", and "example_output".',
        placeholder: 'e.g., A marketing email for a new product launch, or a function to sort an array in Python.',
    },
    context: {
        purpose: "Transforms a simple request into a professional, structured JSON prompt for advanced AI models.",
        benefit: "Dramatically improves the quality and reliability of AI-generated content by providing clear, detailed, and unambiguous instructions.",
        proFeature: "Ask it to include a 'chain-of-thought' section in the JSON to guide the AI's reasoning process for complex tasks."
    }
  },
  // --- Coding & Development ---
  {
    id: 'code-explainer',
    name: 'Code Explainer',
    description: 'Get a clear, line-by-line explanation of any code snippet.',
    category: ToolCategory.Coding,
    icon: <CodeIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an expert programmer and code reviewer with a talent for explaining complex topics simply. Your goal is to explain code clearly. Use Markdown for formatting, especially for code blocks.',
    props: {
      promptTemplate: 'Explain the following code snippet line-by-line in plain English. Describe what the code does, its logic, and any potential improvements. Code:\n```\n{userInput}\n```',
      placeholder: 'Paste your code snippet here...',
    },
    context: {
      purpose: "Breaks down and explains code in plain English.",
      benefit: "Helps developers understand unfamiliar code, learn new programming concepts, and debug more effectively.",
      proFeature: "Ask it to explain the code's time and space complexity (Big O notation) for performance analysis."
    }

  },
  {
    id: 'bug-finder',
    name: 'Bug Finder',
    description: 'Paste your code and let AI find potential bugs and errors.',
    category: ToolCategory.Coding,
    icon: <BugIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a senior software engineer specializing in debugging and code quality assurance. Your task is to analyze code for errors. Use Markdown formatting.',
    props: {
      promptTemplate: 'Analyze the following code for potential bugs, logical errors, or performance issues. Provide a list of identified issues and suggest fixes for each. Code:\n```\n{userInput}\n```',
      placeholder: 'Paste your code with a potential bug here...',
    },
    context: {
      purpose: "Scans code to identify potential bugs, errors, and performance issues.",
      benefit: "Saves hours of manual debugging by quickly pointing out potential problem areas and suggesting solutions.",
      proFeature: "Specify the programming language to get more accurate and context-aware bug detection."
    }
  },
  {
    id: 'unit-test-generator',
    name: 'Unit Test Generator',
    description: 'Generate a suite of unit tests for a given function or code block.',
    category: ToolCategory.Coding,
    icon: <BeakerIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a senior software engineer with expertise in Test-Driven Development (TDD). Your task is to generate a suite of unit tests for a given function. The tests should cover happy paths, edge cases, and potential error conditions. Use a common testing framework for the language identified (e.g., PyTest for Python, Jest for JavaScript/TypeScript).',
    props: {
      promptTemplate: 'Generate a suite of unit tests for the following function. Cover happy paths, edge cases, and error handling. Code:\n```\n{userInput}\n```',
      placeholder: 'Paste a function here, e.g., a Python function to calculate Fibonacci or a JavaScript function to validate an email address.',
    },
    context: {
      purpose: "Automatically creates unit tests for your code.",
      benefit: "Improves code quality and reliability by ensuring functions work as expected, and saves significant time in writing tests manually.",
      proFeature: "Specify a testing library (e.g., 'using Jest and Testing Library') to get tests tailored to your project's stack."
    }
  },
  {
    id: 'code-converter',
    name: 'Code Converter',
    description: 'Translate code snippets between different programming languages.',
    category: ToolCategory.Coding,
    icon: <ArrowPathIcon />,
    component: ToolComponentType.DoubleSelectTool,
    systemInstruction: 'You are an expert polyglot programmer. Your task is to convert a code snippet from a source language to a target language, preserving the logic and functionality. Provide only the converted code in a markdown block, without any extra explanation.',
    props: {
      promptTemplate: 'Convert the following code from {select1} to {select2}:\n\n```\n{userInput}\n```',
      placeholder: 'Paste your code snippet here...',
      select1: {
        label: 'From Language',
        options: ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Ruby', 'TypeScript'],
      },
      select2: {
        label: 'To Language',
        options: ['Python', 'JavaScript', 'Java', 'C++', 'Go', 'Ruby', 'TypeScript'],
      },
    },
    context: {
      purpose: 'Translates code from one programming language to another.',
      benefit: 'Helps developers quickly migrate logic between different parts of a tech stack or learn a new language by seeing familiar patterns.',
      proFeature: 'After converting, ask the Code Explainer tool to explain the new code snippet to solidify your understanding.'
    }
  },
  {
    id: 'changelog-generator',
    name: 'Changelog Generator',
    description: 'Automatically create a formatted changelog from a list of commit messages.',
    category: ToolCategory.Coding,
    icon: <DocumentDuplicateIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an expert developer who maintains open-source projects. Your task is to take a list of commit messages and generate a clean, formatted changelog in Markdown. Group the changes by type (e.g., Features, Bug Fixes, Other).',
    props: {
      promptTemplate: 'Generate a changelog from the following list of commit messages. Group them into sections like "Features", "Fixes", and "Chores".\n\n{userInput}',
      placeholder: 'Paste your commit messages here, one per line...',
    },
    context: {
      purpose: 'Generates a structured changelog from a raw list of commit messages.',
      benefit: 'Saves time during the release process and creates clear, readable release notes for users and contributors.',
      proFeature: 'Specify a version number in your prompt (e.g., "for version 2.5.0") to have it included in the changelog header.'
    }
  },
  {
    id: 'regex-generator',
    name: 'Regex Generator',
    description: 'Generate regular expressions from a plain English description.',
    category: ToolCategory.Coding,
    icon: <CodeIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an expert in regular expressions. Your task is to take a natural language description of a pattern and generate the corresponding regex. Provide the regex and a brief explanation of how it works.',
    props: {
      promptTemplate: 'Generate a regular expression that accomplishes the following: {userInput}',
      placeholder: 'e.g., Find all email addresses in a text, or validate a password that must contain an uppercase letter, a number, and be at least 8 characters long.',
    },
    context: {
      purpose: "Creates complex regular expressions from simple text descriptions.",
      benefit: "Saves developers from the often tedious and error-prone task of writing regex, making it easy to perform powerful text validation and searching.",
      proFeature: "Provide examples of strings that should and should not match to help the AI generate a more accurate regex."
    }
  },
  {
    id: 'regex-explainer',
    name: 'Regex Explainer',
    description: 'Get a detailed, step-by-step explanation of a complex regular expression.',
    category: ToolCategory.Coding,
    icon: <QuestionMarkCircleIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an expert in regular expressions. Your task is to take a regex pattern and provide a clear, step-by-step explanation of what each part of the pattern does. Use Markdown to format the explanation.',
    props: {
      promptTemplate: 'Explain the following regular expression in detail: `{userInput}`',
      placeholder: 'e.g., ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    },
    context: {
      purpose: "Breaks down and explains complex regular expressions in plain English.",
      benefit: "Helps developers understand, debug, and learn from existing regex patterns, demystifying a powerful but often confusing tool.",
      proFeature: "Provide a string and ask 'Why does this string not match the provided regex?' to get targeted debugging help."
    }
  },
  {
    id: 'commit-message-generator',
    name: 'Commit Message Generator',
    description: 'Generate a conventional commit message from your git diff output.',
    category: ToolCategory.Coding,
    icon: <GitCommitIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: "You are an expert software developer who follows the Conventional Commits specification. Your task is to analyze a 'git diff' output and generate a well-formatted, conventional commit message. The message should have a type (e.g., feat, fix, chore), a concise subject line, and an optional body explaining the changes in more detail.",
    props: {
        promptTemplate: "Generate a conventional commit message for the following 'git diff' output:\n\n```\n{userInput}\n```",
        placeholder: "Paste your 'git diff' output here...",
    },
    context: {
        purpose: "Creates well-formatted commit messages from your code changes.",
        benefit: "Promotes best practices, improves repository history clarity, and saves time writing manual commit messages.",
        proFeature: "Specify a ticket number (e.g., 'for ticket JIRA-123') to have it automatically included in the commit message footer."
    }
  },
  {
    id: 'pseudocode-generator',
    name: 'Pseudocode Generator',
    description: 'Translate plain English logic into structured pseudocode.',
    category: ToolCategory.Coding,
    icon: <PenIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a computer science instructor who excels at breaking down problems into logical steps. Your task is to convert a description of a process into clear, language-agnostic pseudocode.',
    props: {
      promptTemplate: 'Write pseudocode for the following process: {userInput}.',
      placeholder: 'e.g., A function that checks if a number is prime',
    },
    context: {
      purpose: "Creates a high-level, language-independent description of an algorithm.",
      benefit: "Helps in planning and designing code logic before implementation, making it easier to write clean and effective programs.",
      proFeature: "Ask it to convert existing code from one language into pseudocode to better understand its core logic."
    }
  },
  {
    id: 'sql-query-generator',
    name: 'SQL Query Generator',
    description: 'Translate plain English descriptions into functional SQL queries.',
    category: ToolCategory.Coding,
    icon: <DatabaseIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a senior database administrator and SQL expert. Your task is to translate a natural language request into a clean, efficient, and standard SQL query. Return the query inside a Markdown SQL code block.',
    props: {
        promptTemplate: 'Translate the following request into an SQL query: {userInput}.',
        placeholder: 'e.g., Find all users from the "users" table who signed up in the last 30 days and live in California.',
    },
    context: {
        purpose: "Converts natural language into SQL code.",
        benefit: "Empowers developers, analysts, and students to interact with databases without needing to memorize complex SQL syntax.",
        proFeature: "Provide the table schema (e.g., 'users table has columns: id, name, email, signup_date, state') for a more accurate and robust query."
    }
  },
  {
    id: 'code-refactorer',
    name: 'Code Refactorer',
    description: 'Improve the readability, efficiency, and structure of your existing code.',
    category: ToolCategory.Coding,
    icon: <ArrowPathIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a senior software architect specializing in code quality and best practices. Your task is to refactor the provided code to be more efficient, readable, and maintainable. Provide the refactored code inside a Markdown code block and a brief explanation of the changes made.',
    props: {
      promptTemplate: 'Refactor the following code and explain the improvements:\n\n```\n{userInput}\n```',
      placeholder: 'Paste your code snippet here that you want to improve...'
    },
    context: {
      purpose: "Rewrites existing code to improve its internal structure without changing its external behavior.",
      benefit: "Helps developers create cleaner, more efficient, and easier-to-maintain code, reducing technical debt.",
      proFeature: "Specify a particular goal for the refactoring, such as 'make this more readable' or 'improve performance'."
    }
  },
  {
    id: 'api-docs-writer',
    name: 'API Documentation Writer',
    description: 'Generate clear and professional documentation for your API endpoints.',
    category: ToolCategory.Coding,
    icon: <BookIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a technical writer specializing in API documentation. Your task is to generate clear, concise documentation for an API endpoint based on a code snippet or description. The documentation should include the endpoint\'s purpose, parameters, request body, and a sample response. Use Markdown for formatting.',
    props: {
      promptTemplate: 'Generate API documentation for the following code/endpoint: {userInput}',
      placeholder: 'Paste the function or controller code for your API endpoint, or describe it. e.g., "A POST endpoint at /api/users that creates a new user with a name and email."'
    },
    context: {
      purpose: "Creates structured documentation for API endpoints.",
      benefit: "Saves developers significant time in writing documentation, leading to better-documented and easier-to-use APIs.",
      proFeature: "Provide a code snippet and ask it to generate documentation in a specific format, like OpenAPI (Swagger) YAML."
    }
  },
  {
    id: 'github-readme-generator',
    name: 'GitHub README Generator',
    description: 'Create a professional README.md for your project repository.',
    category: ToolCategory.Coding,
    icon: <DocumentTextIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a developer relations expert and technical writer. Your task is to create a professional, well-formatted GitHub README.md file in Markdown, based on user-provided project details. The README should be clear, concise, and encourage community engagement.',
    props: {
        promptTemplate: 'Generate a GitHub README.md file for the following project: {userInput}. Include sections for: Project Title, a brief Description, key Features, Tech Stack used, Installation/Getting Started instructions, and a simple Usage example.',
        placeholder: 'Provide details about your project. e.g.,\nTitle: Image-Optimizer-CLI\nFeatures: Compresses JPEGs and PNGs, resizes images.\nTech Stack: Node.js, Sharp.js, Commander.js',
    },
    context: {
        purpose: "Generates a well-structured and professional README file for your code repositories.",
        benefit: "Improves your project's presentation, making it easier for other developers to understand, use, and contribute to your work.",
        proFeature: "Ask it to include a 'Contributing' section with a template for bug reports and feature requests to foster collaboration."
    }
  },
  // --- Engineering & Tech ---
  {
    id: 'technical-explainer',
    name: 'Technical Concept Explainer',
    description: 'Simplify complex engineering and technical topics.',
    category: ToolCategory.Engineering,
    icon: <LightbulbIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an experienced engineer and educator. Your skill is in explaining highly technical concepts to students and non-experts using analogies and simple terms.',
    props: {
      promptTemplate: 'Explain the technical concept of "{userInput}" in simple terms, using an analogy to help with understanding.',
      placeholder: 'e.g., How a blockchain works, or the principles of a PID controller',
    },
    context: {
      purpose: "Breaks down complex technical subjects into easy-to-understand explanations.",
      benefit: "Aids students and professionals in grasping difficult concepts quickly, improving learning and knowledge retention.",
      proFeature: "Ask it to explain the concept 'to a 5-year-old' or 'to a marketing manager' for different levels of simplification."
    }
  },
  {
    id: 'prd-generator',
    name: 'Project Requirements (PRD) Generator',
    description: 'Generate a comprehensive Project Requirements Document from a high-level idea.',
    category: ToolCategory.Engineering,
    icon: <ClipboardListIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a Senior Product Manager at a leading tech company. Your task is to generate a comprehensive Project Requirements Document (PRD) in Markdown format based on a user\'s high-level project idea. The PRD must be well-structured and include all essential sections.',
    props: {
        promptTemplate: 'Generate a Project Requirements Document (PRD) in Markdown for the following project idea: {userInput}. The PRD must include these sections:\n\n1.  **Problem Statement:** (What problem are we solving?)\n2.  **Target Audience:** (Who are the primary users?)\n3.  **Features & User Stories:** (List key features with user stories in the format: "As a [user type], I want to [action] so that [benefit].")\n4.  **Non-Functional Requirements:** (e.g., Performance, Security, Scalability)\n5.  **Success Metrics:** (How will we measure success? e.g., User engagement, conversion rate)',
        placeholder: 'e.g., A mobile app that helps users find and book local sports facilities.',
    },
    context: {
        purpose: "Transforms a high-level project idea into a structured Project Requirements Document (PRD).",
        benefit: "Provides a solid foundation for project planning, aligning stakeholders and giving engineering teams a clear specification to build from.",
        proFeature: "Specify a project management methodology (e.g., 'with a focus on Agile principles') to get a PRD tailored to that workflow."
    }
  },
  {
    id: 'project-plan',
    name: 'Project Plan Generator',
    description: 'Create a structured plan and timeline for a technical project.',
    category: ToolCategory.Engineering,
    icon: <ClipboardListIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a senior project manager in a tech company. Your task is to create a structured project plan with phases, key milestones, and estimated timelines. Use Markdown for formatting.',
    props: {
      promptTemplate: 'Create a high-level project plan for the following technical project: {userInput}. Break it down into phases (e.g., Discovery, Design, Development, Testing, Deployment) and list key milestones for each phase.',
      placeholder: 'e.g., Building a mobile app for local event discovery',
    },
    context: {
      purpose: "Outlines the key phases, milestones, and tasks for a technical project.",
      benefit: "Provides a clear roadmap for project execution, helping to organize tasks, manage time, and ensure all requirements are met.",
      proFeature: "Include potential risks or challenges in your prompt to get a plan that includes a 'Risk Mitigation' section."
    }
  },
  {
    id: 'system-design-explainer',
    name: 'System Design Explainer',
    description: 'Get a high-level explanation of how to design a complex system.',
    category: ToolCategory.Engineering,
    icon: <ServerStackIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a principal software engineer and system design expert. Your task is to provide a high-level system design for a given application. You should cover key components like load balancers, web servers, application servers, databases, caches, and how they interact. Use Markdown for formatting.',
    props: {
      promptTemplate: 'Provide a high-level system design for a system like {userInput}.',
      placeholder: 'e.g., Twitter, Netflix, or a URL shortening service'
    },
    context: {
      purpose: "Outlines the architectural components for building scalable applications.",
      benefit: "Helps engineers and students prepare for system design interviews and understand the building blocks of large-scale tech products.",
      proFeature: "Ask for trade-offs between different database choices, like 'SQL vs NoSQL for this system'."
    }
  },
  {
    id: 'troubleshooting-guide',
    name: 'Technical Troubleshooting Guide',
    description: 'Generate a step-by-step guide to diagnose and solve a technical problem.',
    category: ToolCategory.Engineering,
    icon: <WrenchScrewdriverIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an experienced IT support specialist and systems engineer. Your task is to create a step-by-step troubleshooting guide for a given technical problem. The steps should be logical, starting from the simplest solutions and progressing to more complex ones. Use Markdown formatting.',
    props: {
      promptTemplate: 'Create a step-by-step troubleshooting guide for the following problem: {userInput}',
      placeholder: 'e.g., "My home WiFi is slow" or "My computer is not turning on"'
    },
    context: {
      purpose: "Creates a logical sequence of steps to solve a technical issue.",
      benefit: "Empowers users to solve their own technical problems and provides a structured approach for support professionals, leading to faster resolutions.",
      proFeature: "Specify the user's technical skill level (e.g., 'for a complete beginner') to get a more tailored guide."
    }
  },
  {
    id: 'hackathon-idea-generator',
    name: 'Hackathon & Project Idea Generator',
    description: 'Generate innovative project ideas for technical competitions like hackathons.',
    category: ToolCategory.Engineering,
    icon: <RocketLaunchIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an innovation expert and a seasoned hackathon judge. Your task is to generate creative and technically feasible project ideas for a competition based on a user\'s theme or technology stack. Each idea should include a catchy name, a one-sentence pitch, a brief description of the core functionality, the potential tech stack, and a unique \'wow\' factor. Use Markdown for formatting.',
    props: {
      promptTemplate: 'Generate 3 unique project ideas for a technical competition. The theme or technology stack is: {userInput}. For each idea, provide a project name, a one-sentence pitch, a description, a potential tech stack, and a unique \'wow\' factor to make it stand out.',
      placeholder: 'e.g., AI for social good, Web3 gaming, or using Python and React.',
    },
    context: {
      purpose: "Brainstorms innovative and viable project ideas for hackathons, coding competitions, and personal portfolio building.",
      benefit: "Helps you quickly find a creative and impactful project to work on, giving you a competitive edge and a solid starting point for development.",
      proFeature: "Specify constraints like 'a project that can be built in 24 hours' or 'must use a specific API' to get more tailored and realistic ideas."
    }
  },
  // --- Professional Growth ---
  {
    id: 'resume-writer',
    name: 'Resume Bullet Points',
    description: 'Craft powerful, action-oriented bullet points for your resume.',
    category: ToolCategory.Professional,
    icon: <DocumentTextIcon />,
    component: ToolComponentType.IndustryInputTool,
    systemInstruction: 'You are a professional resume writer and career coach specializing in various industries. Your expertise is in crafting impactful, action-oriented resume bullet points that incorporate industry-specific keywords.',
    props: {
      promptTemplate: 'For the {industry} industry, write 3-5 impactful, action-oriented resume bullet points using the STAR (Situation, Task, Action, Result) method for this responsibility: {userInput}.',
      placeholder: 'e.g., Managed social media accounts for a tech startup',
      industryLabel: 'Target Industry (Optional)',
      industryPlaceholder: 'e.g., Tech, Healthcare, Finance',
    },
    context: {
      purpose: "Transforms job duties into compelling, achievement-oriented resume bullet points.",
      benefit: "Makes your resume stand out to recruiters by showcasing your accomplishments, not just your responsibilities.",
      proFeature: "Provide a target industry to get bullet points tailored with relevant keywords and action verbs for that field."
    }
  },
   {
    id: 'resume-summary',
    name: 'Resume Summary Generator',
    description: 'Create a concise, impactful professional summary for your resume.',
    category: ToolCategory.Professional,
    icon: <UserCircleIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a professional resume writer. Generate a concise and impactful professional summary for a resume based on the user\'s key experiences and skills.',
    props: {
      promptTemplate: 'Write a professional resume summary (3-4 sentences) based on these key skills and experiences: {userInput}',
      placeholder: 'e.g., 5+ years of experience in software development, skilled in Python and AWS, led a team of 3 engineers...',
    },
    context: {
      purpose: 'Generates a powerful "About" or "Summary" section for your resume.',
      benefit: 'Captures a recruiter\'s attention immediately with a strong, concise summary of your qualifications and career goals.',
      proFeature: 'Specify your target job title (e.g., "for a Senior Data Analyst role") to get a more tailored summary.'
    }
  },
  {
    id: 'resume-job-match',
    name: 'Resume Job Match Analyzer',
    description: 'Analyze your resume against a job description to identify gaps and keywords.',
    category: ToolCategory.Professional,
    icon: <ClipboardCheckIcon />,
    component: ToolComponentType.DualTextareaTool,
    systemInstruction: 'You are an expert ATS (Applicant Tracking System) analyst and career coach. Your task is to compare a resume to a job description, identify missing keywords, and provide actionable advice to improve the resume\'s match score. Use Markdown formatting.',
    props: {
      promptTemplate: 'Analyze the following resume against the provided job description. Provide a match score out of 100, list missing keywords from the job description, and suggest specific improvements to the resume. My Resume:\n\n{userInput1}\n\n---JOB DESCRIPTION---\n\n{userInput2}',
      label1: 'Your Resume',
      placeholder1: 'Paste your full resume here...',
      label2: 'Job Description',
      placeholder2: 'Paste the target job description here...',
    },
    context: {
      purpose: 'Compares your resume to a job description to see how well it matches.',
      benefit: 'Helps you tailor your resume for specific jobs, increasing your chances of passing automated screening (ATS) and getting an interview.',
      proFeature: 'After getting feedback, paste in a specific bullet point and ask, "How can I rephrase this to better include the keyword \'project management\'?"'
    }
  },
  {
    id: 'skills-gap-analyzer',
    name: 'Skills Gap Analyzer',
    description: 'Compare your resume to a job description to identify skills you need to develop.',
    category: ToolCategory.Professional,
    icon: <MagnifyingGlassIcon />,
    component: ToolComponentType.DualTextareaTool,
    systemInstruction: 'You are a career development coach and skills analyst. Your task is to compare a user\'s resume to a target job description and identify the key skills that are present in the job description but missing from the resume. Provide a "Skills Gap" list and suggest ways to acquire those skills (e.g., online courses, certifications, projects). Use Markdown formatting.',
    props: {
      promptTemplate: 'Analyze my resume against my dream job description. Identify my skills gap and suggest ways to fill it. My Resume:\n\n{userInput1}\n\n---DREAM JOB DESCRIPTION---\n\n{userInput2}',
      label1: 'Your Resume',
      placeholder1: 'Paste your full resume here...',
      label2: 'Dream Job Description',
      placeholder2: 'Paste the description of a job you aspire to have...',
    },
    context: {
      purpose: "Identifies the skills you need to develop to qualify for a target job.",
      benefit: "Provides a clear roadmap for your professional development, helping you focus your learning on the skills that will have the most impact on your career goals.",
      proFeature: "Ask for 'project ideas to help me learn and demonstrate [specific skill]' to get actionable ways to build your portfolio."
    }
  },
  {
    id: 'cover-letter',
    name: 'Cover Letter Helper',
    description: 'Generate a professional cover letter tailored to a job description.',
    category: ToolCategory.Professional,
    icon: <BriefcaseIcon />,
    component: ToolComponentType.DualTextareaTool,
    systemInstruction: 'You are a career coach and expert cover letter writer. Your task is to write a professional and persuasive cover letter that is tailored to a specific job description, using the user\'s experience.',
    props: {
      promptTemplate: 'Write a professional and persuasive cover letter. Here is my information:\n\nMy Experience: {userInput1}\n\nAnd here is the Job Description I am applying for:\n\n{userInput2}\n\nPlease tailor the cover letter to the job description, highlighting my most relevant skills and experience.',
      label1: 'Your Experience / Resume',
      placeholder1: 'Paste your resume or a summary of your key experiences...',
      label2: 'Job Description',
      placeholder2: 'Paste the job description you are applying for...',
    },
    context: {
      purpose: "Generates a tailored cover letter based on your experience and a job description.",
      benefit: "Saves time and effort in writing custom cover letters, increasing your chances of landing an interview.",
      proFeature: "Add a sentence about why you're specifically interested in *that company* to make your cover letter even more personal."
    }
  },
  {
    id: 'interview-prep',
    name: 'Interview Prep Questions',
    description: 'Generate common interview questions for a specific job role.',
    category: ToolCategory.Professional,
    icon: <QuestionMarkCircleIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an experienced hiring manager and interview coach. Your task is to generate a list of likely interview questions for a specific job role and provide tips on how to answer them effectively. Use Markdown formatting.',
    props: {
      promptTemplate: 'Generate a list of 10 common interview questions (including behavioral and technical questions) for a "{userInput}" role. For each question, provide a brief tip on what the interviewer is looking for.',
      placeholder: 'e.g., Junior Software Engineer or Product Marketing Manager',
    },
    context: {
      purpose: "Creates a list of potential interview questions for a specific job title.",
      benefit: "Helps you prepare for job interviews by anticipating questions, reducing anxiety, and allowing you to practice your answers.",
      proFeature: "Ask for questions based on the 'STAR method' to practice telling compelling stories about your experience."
    }
  },
  {
    id: 'tell-me-about-yourself',
    name: '"Tell Me About Yourself" Pitch Generator',
    description: 'Craft a concise and powerful elevator pitch for interviews.',
    category: ToolCategory.Professional,
    icon: <ChatBubbleLeftRightIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an expert interview coach. Your task is to help a user craft a compelling and concise answer to the "Tell me about yourself" interview question. The answer should be a brief narrative that connects their past experience, present role, and future aspirations to the job they are applying for.',
    props: {
      promptTemplate: 'Write a 90-second "Tell me about yourself" pitch based on these key points: {userInput}',
      placeholder: 'List your key experiences, skills, and the job you\'re applying for. e.g., "5 years in marketing, skilled in SEO, applying for a Digital Marketing Manager role because I want to lead a team."',
    },
    context: {
      purpose: "Crafts a polished and impactful answer to the most common interview question.",
      benefit: "Helps you make a strong first impression in interviews by presenting your story clearly and confidently.",
      proFeature: "Specify the company's industry (e.g., 'for a role at a healthcare startup') to get a pitch tailored to that context."
    }
  },
  {
    id: 'salary-negotiation-scripter',
    name: 'Salary Negotiation Scripter',
    description: 'Get talking points and a script to confidently negotiate your salary.',
    category: ToolCategory.Professional,
    icon: <BriefcaseIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a seasoned career coach and negotiation expert. Your task is to create a professional script with key talking points for a salary negotiation conversation. The script should be confident, polite, and based on the value the user brings to the role.',
    props: {
      promptTemplate: 'Create a salary negotiation script for the following situation: {userInput}. The script should include an opening, points to justify the higher salary based on value and market rate, and a confident closing.',
      placeholder: 'e.g., "I have received a job offer for a Software Engineer role at $100k, but my research shows the market rate is closer to $115k for my experience level."',
    },
    context: {
      purpose: "Provides a script and strategy for salary negotiation.",
      benefit: "Empowers you to confidently and effectively negotiate for a higher salary, potentially increasing your earnings.",
      proFeature: "Include your 'walk-away' number in the prompt to get a script that respectfully maintains your boundaries."
    }
  },
  {
    id: 'career-path-explorer',
    name: 'Career Path Explorer',
    description: 'Suggests potential career paths based on your skills and interests.',
    category: ToolCategory.Professional,
    icon: <MapIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a knowledgeable career counselor. Your task is to analyze a user\'s skills and interests and suggest 3-5 potential career paths. For each path, describe the typical responsibilities and why it might be a good fit. Use Markdown for formatting.',
    props: {
      promptTemplate: 'Based on the following skills and interests, suggest 3-5 potential career paths: {userInput}',
      placeholder: 'e.g., "I am good at creative writing and data analysis, and I am interested in technology and media."',
    },
    context: {
      purpose: "Helps individuals discover potential career options they may not have considered.",
      benefit: "Provides clarity and direction for students and professionals looking to make a career change or plan their future.",
      proFeature: "Ask for 'the typical educational requirements and starting salary range' for one of the suggested paths to get more detailed information."
    }
  },
   {
    id: 'linkedin-optimizer',
    name: 'LinkedIn Profile Optimizer',
    description: 'Optimize your LinkedIn headline and summary to attract recruiters.',
    category: ToolCategory.Professional,
    icon: <UserCircleIcon />,
    component: ToolComponentType.IndustryInputTool,
    systemInstruction: 'You are a personal branding expert and career coach specializing in LinkedIn. Your goal is to rewrite a LinkedIn profile section (like a headline or summary) to be more impactful and keyword-rich for a specific target role, attracting recruiters.',
    props: {
      promptTemplate: 'Optimize the following LinkedIn profile section to be more compelling and professional for a target role in "{industry}". Include relevant keywords. Section: {userInput}',
      placeholder: 'Paste your current LinkedIn headline or "About" summary here...',
      industryLabel: 'Target Role or Industry',
      industryPlaceholder: 'e.g., Senior Product Manager at a SaaS company'
    },
    context: {
      purpose: "Rewrites your LinkedIn headline and 'About' section for maximum impact.",
      benefit: "Improves your profile's visibility to recruiters and presents your personal brand in a more professional and compelling way.",
      proFeature: "Ask it to generate 3 different headline variations to A/B test on your profile."
    }
  },
  {
    id: 'interview-feedback',
    name: 'Interview Answer Feedback',
    description: 'Get constructive feedback on your answers to interview questions.',
    category: ToolCategory.Professional,
    icon: <ChatBubbleLeftRightIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an experienced hiring manager. Your task is to provide constructive feedback on an interview answer. Analyze the answer for clarity, structure (like the STAR method), and relevance. Provide specific, actionable suggestions for improvement. Use Markdown formatting.',
    props: {
      promptTemplate: 'Please provide constructive feedback on the following interview answer. Analyze it for structure, clarity, and impact. \n\n{userInput}',
      placeholder: 'First, write the interview question (e.g., "Question: Tell me about a time you handled a difficult stakeholder."). Then, on a new line, write your full answer.',
    },
    context: {
      purpose: "Analyzes your interview answers and provides constructive feedback.",
      benefit: "Helps you refine your communication, structure your answers more effectively (using methods like STAR), and interview with more confidence.",
      proFeature: "After getting feedback, provide a revised answer and ask 'Is this version stronger and why?'"
    }
  },
  {
    id: 'support-reply-generator',
    name: 'Customer Support Reply Generator',
    description: 'Generate empathetic and helpful replies to common customer support queries.',
    category: ToolCategory.Professional,
    icon: <ChatBubbleLeftRightIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an experienced and empathetic customer support specialist. Your task is to draft a helpful, polite, and clear response to a customer query.',
    props: {
        promptTemplate: 'Draft a customer support reply for the following customer query: {userInput}. The reply should acknowledge the problem, show empathy, provide a solution or next step, and end politely.',
        placeholder: 'e.g., "My order arrived damaged," or "I forgot my password and can\'t log in."',
    },
    context: {
        purpose: "Creates professional and empathetic replies for customer service.",
        benefit: "Improves customer satisfaction and saves support agents time by providing consistent, high-quality response templates.",
        proFeature: "Add a constraint, such as 'The customer is very angry,' to get a reply tailored for de-escalation."
    }
  },
  {
    id: 'meeting-agenda-creator',
    name: 'Meeting Agenda Creator',
    description: 'Generate a structured agenda for a meeting based on its objective and key topics.',
    category: ToolCategory.Professional,
    icon: <ClipboardListIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an expert executive assistant and productivity specialist. Your task is to create a clear, structured, and effective meeting agenda. Use Markdown formatting.',
    props: {
        promptTemplate: 'Create a meeting agenda based on the following information: {userInput}. The agenda should include the meeting objective, a list of attendees, topics with allocated times, and any required preparation.',
        placeholder: 'e.g., Objective: Plan the Q3 marketing campaign. Topics: Budget review, channel strategy, content calendar. Attendees: Marketing team.',
    },
    context: {
        purpose: "Generates a structured agenda for any type of meeting.",
        benefit: "Leads to more productive and focused meetings by setting clear expectations, managing time effectively, and ensuring all topics are covered.",
        proFeature: "Specify the total meeting duration (e.g., 'for a 60-minute meeting') to get realistic time allocations for each topic."
    }
  },
  {
    id: 'performance-review-helper',
    name: 'Performance Review Helper',
    description: 'Write professional and constructive self-assessments for performance reviews.',
    category: ToolCategory.Professional,
    icon: <ChartPieIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an HR business partner and career coach. Your task is to help a user write a professional and impactful self-assessment for their performance review. You will turn their bullet points into well-structured prose. Use Markdown formatting for structure.',
    props: {
      promptTemplate: 'Write a self-assessment for a performance review based on these points: {userInput}',
      placeholder: 'List your accomplishments as bullet points. e.g., - Led the Project X launch - Increased team efficiency by 15% - Mentored a junior developer'
    },
    context: {
      purpose: "Helps you articulate your achievements for performance reviews.",
      benefit: "Ensures you present your accomplishments in a professional, impactful way, which can support your case for a promotion or raise.",
      proFeature: "Ask it to frame your accomplishments using the company's specific values, if you provide them."
    }
  },
  {
    id: 'public-speaking-coach',
    name: 'Public Speaking Coach',
    description: 'Get feedback on your speech scripts and tips to improve delivery and confidence.',
    category: ToolCategory.Professional,
    icon: <MegaphoneIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a world-class public speaking coach and communication expert. Your task is to analyze a speech or presentation script. Provide constructive feedback on its structure, clarity, and persuasiveness. Offer specific suggestions to improve engagement, flow, and impact. Also, provide 3 general tips for confident delivery based on the script\'s content. Use Markdown for formatting.',
    props: {
      promptTemplate: 'Please provide feedback on the following speech script: {userInput}',
      placeholder: 'Paste your speech or presentation script here...',
    },
    context: {
      purpose: "Analyzes your speech script to provide actionable feedback on structure, clarity, and impact.",
      benefit: "Helps you craft more compelling presentations and builds your confidence as a speaker.",
      proFeature: "Ask for feedback on a specific section, like 'How can I make my introduction more impactful?' or 'Is my call to action strong enough?'"
    }
  },
  {
    id: 'conflict-resolution-scripter',
    name: 'Conflict Resolution Scripter',
    description: 'Generate talking points for navigating difficult professional conversations.',
    category: ToolCategory.Professional,
    icon: <ChatBubbleLeftRightIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an expert in conflict resolution, HR, and professional communication. The user will describe a difficult situation. Your task is to provide a structured set of talking points and a strategy for the conversation. Use a calm, professional, and empathetic tone. The output should include an \'Opening Statement\', \'Key Talking Points\' (using phrases that focus on behavior and impact, not blame), and \'Potential Resolutions\'. Use Markdown for formatting.',
    props: {
      promptTemplate: 'Provide a script and strategy for the following difficult conversation: {userInput}',
      placeholder: 'e.g., Giving a team member feedback about missing deadlines, or asking your boss for a raise.',
    },
    context: {
      purpose: "Provides a roadmap and talking points for navigating challenging workplace conversations.",
      benefit: "Reduces anxiety and prepares you to handle difficult situations constructively, professionally, and effectively.",
      proFeature: "Specify the other person's likely personality (e.g., 'they might get defensive') to get tailored de-escalation tactics."
    }
  },
  {
    id: 'active-listening-trainer',
    name: 'Active Listening Trainer',
    description: 'Generate paraphrasing and clarifying questions to become a better listener.',
    category: ToolCategory.Professional,
    icon: <QuestionMarkCircleIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a communication skills trainer specializing in active listening. The user will provide a statement that someone might say. Your task is to generate examples of good active listening responses. The output should include: 1. A Paraphrased version (to confirm understanding). 2. A Clarifying Question (to gather more information). 3. An Empathetic Response (to validate feelings). Use Markdown for formatting.',
    props: {
      promptTemplate: "Generate active listening responses for the following statement: '{userInput}'",
      placeholder: "Enter a statement you might hear at work, e.g., 'I'm so overwhelmed with this project, I don't think I can meet the deadline.'",
    },
    context: {
      purpose: "Teaches the core skills of active listening by generating example responses.",
      benefit: "Improves your communication skills, helps build stronger professional relationships, and makes you a more effective team member and leader.",
      proFeature: "Provide a longer piece of dialogue and ask the AI to 'identify key points and generate clarifying questions for the entire conversation'."
    }
  },
  {
    id: 'networking-icebreakers',
    name: 'Networking Icebreakers',
    description: 'Generate context-aware icebreakers for professional networking events.',
    category: ToolCategory.Professional,
    icon: <UserCircleIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a networking expert and career coach. The user will describe a networking event or situation. Your task is to generate 5-7 context-aware icebreakers and opening questions that are professional, open-ended, and encourage conversation.',
    props: {
      promptTemplate: 'Generate networking icebreakers for the following situation: {userInput}',
      placeholder: 'e.g., A tech conference on AI, a local business meetup, or reaching out to someone on LinkedIn.',
    },
    context: {
      purpose: "Provides conversation starters for professional networking situations.",
      benefit: "Reduces networking anxiety and helps you make meaningful connections by starting conversations that go beyond small talk.",
      proFeature: "Specify your own job title and goals (e.g., 'As a student looking for an internship...') to get icebreakers that align with your objectives."
    }
  },
  // --- File & Media Utilities ---
  {
    id: 'document-summarizer',
    name: 'PDF & DOCX Summarizer',
    description: 'Paste text from a document to get a concise summary of its key points.',
    category: ToolCategory.FileUtilities,
    icon: <FileDocumentIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are an expert at summarizing technical and business documents. Analyze the provided text and extract the key findings, main arguments, and any action items. Present the summary in clear, concise bullet points under respective headings. Use Markdown for formatting.',
    props: {
      promptTemplate: 'Summarize the following document text, identifying key points, arguments, and action items: {userInput}',
      placeholder: 'Paste the text from your PDF or DOCX file here...',
    },
    context: {
      purpose: "Distills long document text into a quick, easy-to-read summary.",
      benefit: "Saves significant time by allowing you to quickly understand the essence of reports, articles, and documents without reading them in full.",
      proFeature: "Ask it to 'create a one-paragraph executive summary' for a very high-level overview."
    }
  },
  {
    id: 'document-rewriter',
    name: 'Document Content Rewriter',
    description: 'Rewrite and improve text from your documents. Change tone, style, or fix grammar.',
    category: ToolCategory.FileUtilities,
    icon: <PenIcon />,
    component: ToolComponentType.ToneChangerTool,
    systemInstruction: 'You are an expert editor. Your task is to rewrite the provided text from a document to match the specified tone and intensity, improving clarity, flow, and overall quality while preserving the core message.',
    props: {
      promptTemplate: 'Rewrite the following document text with a {intensity} {tone} tone: {userInput}',
      placeholder: 'Paste the text from your document that you want to rewrite...',
      tones: ['More Professional', 'More Casual', 'More Persuasive', 'Simpler', 'More Academic', 'More Confident'],
      intensities: ['Subtle', 'Noticeable', 'Complete Overhaul'],
    },
    context: {
      purpose: 'Edits and enhances text content from any document.',
      benefit: 'Quickly adapt your writing for different audiences or purposes, improving the impact and professionalism of your documents.',
      proFeature: 'Use the "Complete Overhaul" intensity to get a fundamentally different version of your original text.'
    }
  },
  {
    id: 'text-merger',
    name: 'Text Content Merger & Synthesizer',
    description: 'Merge text from multiple sources into a cohesive, synthesized document.',
    category: ToolCategory.FileUtilities,
    icon: <DocumentPlusIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: "You are an expert at synthesizing information. The user will provide multiple text blocks separated by '---'. Your task is to merge them into a single, cohesive document, removing redundancies, creating smooth transitions, and organizing the content logically. After the merged text, provide a brief summary of the combined content. Use Markdown formatting.",
    props: {
      promptTemplate: 'Merge the following text blocks into a single, cohesive document, then summarize it:\n\n{userInput}',
      placeholder: 'Paste your first block of text here...\n\n---\n\nPaste your second block of text here...\n\n---\n\n...and so on.',
    },
    context: {
      purpose: 'Combines multiple separate texts into one unified document.',
      benefit: 'Saves time by automatically creating a first draft from various sources, ideal for creating reports or literature reviews from scattered notes.',
      proFeature: "Ask it to 'adopt the style of the first text block' for the entire merged document."
    }
  },
  {
    id: 'text-splitter',
    name: 'Text Content Splitter',
    description: 'Split a long document into smaller, themed sections or chapters.',
    category: ToolCategory.FileUtilities,
    icon: <ScissorsIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: "You are an expert at organizing content. Analyze the provided text and split it into logical sections based on the topics discussed. Provide a clear, descriptive heading (using Markdown H2 `##`) for each new section. The output should be the full text, but restructured with these headings.",
    props: {
      promptTemplate: 'Analyze and split the following text into logical, themed sections with clear headings:\n\n{userInput}',
      placeholder: 'Paste the full text of a long document you want to split and organize...',
    },
    context: {
      purpose: 'Automatically structures a long, unformatted text into logical sections.',
      benefit: 'Improves the readability and organization of long documents, making it easier to create chapters for a book or sections for a report.',
      proFeature: "Specify the number of desired sections (e.g., 'split this into 5 main sections') to guide the AI's organization."
    }
  },
  {
    id: 'content-converter',
    name: 'Content Format Converter',
    description: 'Convert raw text into different structured formats like a report, JSON, or HTML.',
    category: ToolCategory.FileUtilities,
    icon: <ArrowsRightLeftIcon />,
    component: ToolComponentType.SingleSelectTool,
    systemInstruction: "You are a data formatting expert. Your task is to take the user's raw text and convert it into a well-structured, clean {selectValue} format. Ensure the output is valid for the chosen format.",
    props: {
      promptTemplate: 'Convert the following raw text into a well-structured {selectValue}:\n\n{userInput}',
      placeholder: 'Paste your raw text or data here...',
      select: {
        label: 'Target Format',
        options: ['Professional Report (Markdown)', 'JSON Array of Objects', 'Bulleted List Summary', 'Formal Email', 'Basic HTML Document'],
      },
    },
    context: {
      purpose: 'Restructures raw text into a specific, structured format.',
      benefit: 'Saves significant time in manually reformatting text for different uses, from data entry to creating structured documents.',
      proFeature: 'For JSON conversion, you can specify the desired keys in your prompt (e.g., "use keys: name, email, and message").'
    }
  },
  {
    id: 'image-compression-advisor',
    name: 'Image Compression Advisor',
    description: 'Get expert advice on how to best compress your images for web, print, or other uses.',
    category: ToolCategory.FileUtilities,
    icon: <ArrowDownOnSquareIcon />,
    component: ToolComponentType.ImageInput,
    systemInstruction: "You are an expert in digital image processing and web optimization. Analyze the provided image and the user's intended use for it. Provide a detailed recommendation for compressing it in a Markdown-formatted report. The report must include:\n1.  **Analysis:** A brief analysis of the image's characteristics (e.g., complexity, color palette, presence of transparency).\n2.  **Recommended Format:** Suggest the best format (JPEG, PNG, WebP, AVIF) and explain why.\n3.  **Compression Settings:** Provide specific quality settings (e.g., JPEG quality 75-85, or WebP lossless).\n4.  **Trade-offs:** Explain the trade-offs between file size and visual quality for the user's specific goal.",
    props: {
        promptTemplate: 'Analyze this image and provide a compression strategy for the following use case: {userInput}',
        placeholder: 'Describe the intended use of this image (e.g., website hero image, email attachment, print).',
    },
    context: {
        purpose: "Provides an expert, AI-driven strategy for image compression.",
        benefit: "Helps you achieve optimal image quality with the smallest possible file size, improving website performance and user experience, without needing to be a graphics expert.",
        proFeature: "Ask for a 'comparison between WebP and AVIF for this image' to get cutting-edge advice."
    }
  },
  {
    id: 'video-compression-strategist',
    name: 'Video Compression Strategist',
    description: 'Get a detailed strategy for compressing videos for streaming, social media, or archival.',
    category: ToolCategory.FileUtilities,
    icon: <FilmIcon />,
    component: ToolComponentType.SingleSelectTool,
    systemInstruction: "You are a professional video engineer. Your task is to provide a detailed video compression strategy based on the user's description and chosen use case. The strategy should be presented in a Markdown format. Include recommendations for:\n1.  **Codec:** (e.g., H.264 for compatibility, H.265/HEVC for efficiency, AV1 for cutting-edge web).\n2.  **Bitrate:** (Suggest a variable or constant bitrate in kbps or Mbps).\n3.  **Resolution & Framerate:** (e.g., 1080p at 30fps).\n4.  **Container Format:** (e.g., MP4, WebM).\n5.  **Rationale:** Briefly explain why these settings are ideal for the selected use case.",
    props: {
      promptTemplate: 'I have a video with the following characteristics: {userInput}. Please generate a detailed compression strategy for the "{selectValue}" use case.',
      placeholder: 'Describe your video, e.g., "a 5-minute, 4K talking head video with some screen recording sections."',
      select: {
        label: 'Primary Use Case',
        options: ['Web Streaming (e.g., YouTube)', 'Social Media (e.g., Instagram)', 'Archival/Storage', 'Email Attachment'],
      },
    },
    context: {
      purpose: "Generates a professional plan for encoding and compressing video files.",
      benefit: "Saves you from the complex guesswork of video encoding, ensuring your videos have the best balance of quality and file size for any application.",
      proFeature: "Specify the source file's properties (e.g., 'source is a 2GB ProRes file') to get a more tailored strategy."
    }
  },
];