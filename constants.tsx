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
const CogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
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
const TranslateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m0 0a9 9 0 019-9m-9 9a9 9 0 009 9" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 21v-5.25m10.5 5.25v-5.25" /></svg>;
const CubeTransparentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>;

// New Icons for Communication Tools
const ArrowUturnLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>;
const ExclamationTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>;
// New Icons for File Utilities
const FileDocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const ArrowDownOnSquareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3v11.25" /></svg>;
const ArrowsRightLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>;
const DocumentPlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const ScissorsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536 1.536m-1.536-1.536l6.364 6.364m-7.9 0l6.364-6.364m-1.536 1.536l1.536-1.536M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm-3.375 0h.008v.008h-.008V6.375zm10.5 8.25a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm-3.375 0h.008v.008h-.008v-.008z" /></svg>;
// Icons for the latest batch of new tools
const ChatBubbleBottomCenterTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const TicketIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h5.25m0 0h5.25m-10.5 0h5.25m-5.25 0h5.25M6 6.75h.75m-3.75 3h.75m-3.75 3h.75m3.75 3h.75m-3.75-9h15a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25v-9A2.25 2.25 0 016 4.5h15" /></svg>;
const BuildingOfficeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M6.75 21v-2.25a2.25 2.25 0 012.25-2.25h6a2.25 2.25 0 012.25 2.25V21M6.75 3v2.25a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25V3m17.25 0v2.25a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25V3" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const EnvelopeOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488a2.25 2.25 0 01-2.18 0l-6.478-3.488A2.25 2.25 0 012.25 9.906V9M21.75 9a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 9m19.5 0v.906c0 .623-.243 1.201-.658 1.622l-6.478 3.488a2.25 2.25 0 01-2.18 0l-6.478-3.488A2.25 2.25 0 012.25 9.906V9m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 9" /></svg>;
const WaveformIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h.007v.007H3.75V12zm4.125 0h.007v.007h-.007V12zm4.125 0h.007v.007h-.007V12zm4.125 0h.007v.007h-.007V12zm4.125 0h.007v.007h-.007V12z" /></svg>;
const FaceSmileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5h.01m5.98 0h.01M9 15h6" /></svg>;

export const CATEGORIES: ToolCategory[] = [
  ToolCategory.Writing,
  ToolCategory.Business,
  ToolCategory.Communication,
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
    name: 'Blog Post Studio',
    description: 'A multi-step workflow to brainstorm, outline, draft, and enhance high-quality blog posts.',
    category: ToolCategory.Writing,
    icon: <PenIcon />,
    component: ToolComponentType.BlogPost,
    featured: true,
    systemInstruction: `You are a world-class content strategist and copywriter AI, operating as "Blog Post Studio". Your expertise spans SEO, content marketing, and engaging writing. You will guide the user through a multi-step process:
1.  **Brainstorming**: Given a topic, you will generate compelling article ideas, suggest target audiences, and provide primary keywords.
2.  **Outlining**: Based on a chosen idea, you will create a detailed, logical, and SEO-friendly article outline.
3.  **Drafting**: Using an outline, you will write a complete, high-quality blog post, adhering to specified tone, style, voice, and length. You must seamlessly integrate keywords, suggest internal/external link placements (using placeholders like [Link to relevant internal page] or [Link to authoritative external source]), generate SEO metadata, and create related social media posts.
4.  **Enhancement**: You will analyze the final draft for SEO, suggest relevant visuals by providing descriptive prompts for an AI image generator, and provide a readability analysis.
Your output at each stage should be clear, well-structured, and in Markdown format.`,
    props: {
      promptTemplate: 'Write a full blog post based on the following detailed outline: \n\n{outline}\n\nStrictly adhere to the structure and points in the outline. The blog post should be written for a {audience} audience in a {tone}, {style} manner, with a {voice} voice. The desired length is {length}. The primary keywords to naturally integrate are: {keywords}.\n\nThe output must be a single block of text in Markdown format and include the following clearly labeled sections in order:\n\n1.  **SEO Title:** (A compelling title based on the outline, around 60 characters)\n2.  **Meta Description:** (An engaging summary based on the outline, around 160 characters)\n3.  **SEO Keywords:** (A comma-separated list of 10-15 relevant keywords)\n4.  **Blog Post Body:** (The full article, following the provided outline, with a catchy main title using H1 (`#`), and subheadings using H2 (`##`) and H3 (`###`) as specified in the outline. Place suggestions for links in brackets, e.g., [Link to our pricing page].)\n5.  **Suggested Call-to-Action:** (A relevant CTA for the end of the post.)\n6.  **Related Social Media Posts:** (Two short posts, one for Twitter/X and one for LinkedIn, to promote the article.)',
      placeholder: 'Enter a broad topic to start, e.g., "The future of AI in marketing."',
      tones: ['Formal', 'Conversational', 'Technical', 'Humorous', 'Persuasive'],
      styles: ['News Report', 'How-To Guide', 'Listicle', 'Opinion Piece', 'Case Study'],
      audiences: ['General Public', 'Industry Experts', 'Beginners', 'Students', 'C-Suite Executives'],
      voices: ['Authoritative', 'Friendly', 'Journalistic', 'Inspirational', 'Analytical'],
      lengths: ['Short Form (~500 words)', 'Standard (~1000 words)', 'In-depth (~2000 words)'],
    },
    context: {
      purpose: "An all-in-one studio that takes you from a raw idea to a polished, SEO-optimized blog post with a guided, multi-step process.",
      benefit: "Streamlines the entire content creation workflow, from brainstorming and outlining to drafting and refining, saving hours of work and ensuring high-quality, strategic content.",
      proFeature: "Each step is interactive. You can edit the AI-generated outline before drafting, and use post-drafting tools to analyze SEO, get image ideas, and more."
    }
  },
  {
    id: 'advanced-writing-assistant',
    name: 'Advanced Writing Assistant',
    description: 'A complete communication coach to fix, rephrase, and analyze your text for any audience.',
    category: ToolCategory.Writing,
    icon: <CubeTransparentIcon />,
    component: ToolComponentType.AdvancedWritingTool,
    systemInstruction: `You are a world-class communication coach and expert copy editor AI. Your task is to analyze and improve text based on a variety of professional criteria. Your output must be a detailed, structured report in Markdown format.

Given the user's text and their specified settings (Tone, Audience, Formality, Goal, Language Variant), you must provide the following sections in your response:

1.  **Corrected Text**: First, present the fully corrected and rewritten version of the text, incorporating all improvements.
2.  **Summary of Changes**: A bulleted list detailing the key modifications made. Group them into categories:
    *   **Grammar & Spelling**: (e.g., Corrected subject-verb agreement).
    *   **Clarity & Conciseness**: (e.g., Simplified a wordy sentence for better flow).
    *   **Vocabulary Enhancement**: (e.g., Replaced 'good' with 'exceptional' for more impact).
3.  **Tone & Style Analysis**: A brief paragraph explaining how the rewritten text now aligns with the user's desired **{tone}** and **{goal}**.
4.  **Audience Appropriateness**: Assess how well the language and complexity suit the specified **{audience}**. (e.g., "The language is now appropriate for 'Technical Experts' as it uses precise industry terminology.").
5.  **Inclusivity & Bias Check**: A critical review of the original text for any potentially biased, non-inclusive, or emotionally charged language. If issues are found, explain them and how the corrected text addresses them. If none are found, state "No inclusivity or bias issues were detected."
6.  **Originality Check**: Briefly comment on whether the phrasing is generic or contains common clichés that could be improved for originality. This is not a formal plagiarism check but a style suggestion.

Adhere strictly to this format.`,
    props: {
        promptTemplate: `Please analyze and rewrite the following text based on these settings:
- Tone: {tone}
- Audience: {audience}
- Formality: {formality}
- Primary Goal: {goal}
- Language Variant: {languageVariant}

Text to Analyze:
"{userInput}"`,
        placeholder: 'Enter any text here to analyze and improve, or use the microphone to dictate...',
        tones: ['Professional', 'Casual', 'Persuasive', 'Empathetic', 'Confident', 'Humorous'],
        audiences: ['General Public', 'Technical Experts', 'Beginners', 'Executives', 'Academic'],
        formalities: ['Formal', 'Semi-Formal', 'Informal'],
        goals: ['Inform', 'Persuade', 'Engage', 'De-escalate a conflict'],
        languageVariants: ['American English', 'British English', 'Canadian English', 'Australian English'],
    },
    context: {
        purpose: 'Acts as a comprehensive communication coach, going beyond simple grammar checks to analyze tone, audience fit, and inclusivity.',
        benefit: 'Ensures your writing is not only correct but also effective, appropriate, and responsible for any personal or professional situation.',
        proFeature: 'Use the microphone button to dictate your text. The AI will then transcribe and analyze your spoken words, providing feedback on the written version.'
    }
  },
   {
    id: 'tone-changer',
    name: 'Advanced Tone & Style Tuner',
    description: 'A comprehensive assistant to adapt your writing for any audience, context, or goal.',
    category: ToolCategory.Writing,
    icon: <WrenchScrewdriverIcon />,
    component: ToolComponentType.AdvancedToneTunerTool,
    systemInstruction: `You are a world-class communication expert and AI copy editor. Your task is to analyze and rewrite text based on a sophisticated set of user-defined parameters. Your output must be a structured report in Markdown format.

Given the user's text and their specified settings (Tone, Scenario, Audience, Formality, Language Variant), you must provide the following sections in your response:

1.  **Rewritten Text**: The fully rewritten version of the text, meticulously adapted to the specified parameters.
2.  **Tone & Style Analysis**:
    *   **Original Tone Assessment**: Briefly describe the tone of the original text.
    *   **Key Changes Made**: A bulleted list explaining the most significant changes in vocabulary, sentence structure, and phrasing to achieve the new tone.
3.  **Impact Prediction**:
    *   **Predicted Audience Reception**: Briefly explain how the target **{audience}** is likely to perceive the new tone in the context of the specified **{scenario}**.
    *   **Effectiveness Score**: Provide a qualitative score (e.g., Highly Effective, Moderately Effective) and a one-sentence justification for how well the rewritten text meets its communication goal.

Adhere strictly to this multi-part, Markdown-formatted output.`,
    props: {
        promptTemplate: `Please analyze and rewrite the following text based on these settings:
- Target Tone: {tone}
- Communication Scenario: {scenario}
- Target Audience: {audience}
- Formality Level: {formality}
- Language Variant: {languageVariant}

Original Text:
"{userInput}"`,
        placeholder: 'Paste the text you want to transform here...',
        tones: ['Professional', 'Friendly', 'Persuasive', 'Humorous', 'Empathetic', 'Confident', 'Assertive', 'Neutral'],
        scenarios: ['General Update', 'Sales Pitch', 'Customer Support', 'Conflict Resolution', 'Giving Feedback', 'Formal Report'],
        audiences: ['General Public', 'Technical Experts', 'C-Suite Executives', 'Close Colleagues', 'New Customers'],
        formalities: ['Formal (Corporate)', 'Semi-Formal (Business Casual)', 'Informal (Conversational)'],
        languageVariants: ['American English', 'British English', 'Canadian English', 'Australian English'],
    },
    context: {
        purpose: "Precisely adapts your writing's tone and style for any situation, audience, or communication goal.",
        benefit: "Goes beyond simple rewrites to ensure your message is not just understood, but is also effective, appropriate, and lands with the intended impact.",
        proFeature: "Use the 'Scenario' and 'Audience' selectors to get highly contextual advice, turning this into a strategic communication coach."
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
    featured: true,
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
    id: 'company-profile',
    name: 'Company Profile Generator',
    description: 'Converts basic organizational details into a professional company profile.',
    category: ToolCategory.Business,
    icon: <BuildingOfficeIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a corporate communications specialist and copywriter. Your task is to write a professional and compelling company profile based on the provided details. The profile should be suitable for a website "About Us" page or a press kit. Structure it with sections like "Our Mission," "Our Story," and "What We Do." Use an engaging and brand-appropriate tone.',
    props: {
        promptTemplate: 'Write a professional company profile based on the following key details: {userInput}',
        placeholder: 'Enter key details: Company Name, Industry, Mission Statement, Founding Story, Core Products/Services, Target Audience...',
    },
    context: {
        purpose: 'Generates a well-structured company profile from key information points.',
        benefit: 'Saves time creating foundational business documents and ensures your company is presented professionally and consistently.',
        proFeature: 'Specify a desired tone in your details, such as "a playful, startup tone" or "a formal, corporate tone," for a tailored profile.'
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
    {
    id: 'timetable-optimizer',
    name: 'Automated Timetable Optimizer',
    description: 'Generate a draft university timetable based on a set of constraints.',
    category: ToolCategory.Business,
    icon: <CalendarIcon />,
    component: ToolComponentType.TimetableOptimizerTool,
    systemInstruction: "You are a university administrator specializing in logistics and scheduling. Your task is to generate a draft timetable based on a list of constraints. The output should be a clear, well-formatted schedule, likely in a Markdown table. You must try your best to satisfy all constraints, but if conflicts are unavoidable, you should flag them. Crucially, you must start your response with a disclaimer in bold: **Disclaimer: This is an AI-generated draft schedule. All constraints and potential conflicts must be manually verified before implementation.**",
    props: {
        promptTemplate: 'Generate a draft timetable based on these constraints: {userInput}',
        placeholder: 'Enter all constraints, e.g., Professor availability (Prof. Smith, MWF 9am-12pm), classroom capacities (Hall A, 100 seats), course dependencies (CS101 before CS201), student course loads, etc.',
    },
    context: {
        purpose: 'Generates an optimized, conflict-free draft timetable for a university or school.',
        benefit: 'Solves a major logistical challenge for administrators, improving resource allocation and student satisfaction by creating a workable schedule from complex constraints.',
        proFeature: 'For best results, structure your constraints clearly using bullet points for each category (Professors, Rooms, Courses).'
    }
  },
  {
    id: 'alumni-engagement-personalizer',
    name: 'Alumni Engagement Personalizer',
    description: 'Draft highly personalized outreach emails to alumni based on their professional profiles.',
    category: ToolCategory.Business,
    icon: <UserCircleIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: "You are an experienced alumni relations and development officer. Your task is to draft a warm, personalized, and professional outreach email based on an alumnus's professional information. The email should reference their specific industry and achievements, connect them to relevant university initiatives, and gently lead towards a call-to-action (like donating, mentoring, or attending an event), without being overly aggressive.",
    props: {
        promptTemplate: 'Draft a personalized outreach email to an alumnus with the following professional profile: {userInput}',
        placeholder: "Paste the alumnus's information here, e.g., from a LinkedIn profile: 'Jane Doe, VP of Engineering at TechCorp, specializes in machine learning. Graduated in 2010 with a B.S. in Computer Science...'",
    },
    context: {
        purpose: "Creates personalized outreach emails for alumni relations and fundraising campaigns.",
        benefit: "Increases the effectiveness of alumni outreach by creating genuine, personal connections at scale, making fundraising appeals far more resonant than generic templates.",
        proFeature: "Specify a goal for the email, e.g., 'The goal is to invite them to be a guest speaker' or 'The goal is to ask for a donation to the new engineering building'."
    }
  },
  // --- Communication ---
  {
    id: 'translator',
    name: 'Advanced AI Translator',
    description: 'Translate text with formality controls and text-to-speech output.',
    category: ToolCategory.Communication,
    icon: <TranslateIcon />,
    component: ToolComponentType.TranslatorTool,
    featured: true,
    systemInstruction: 'You are an expert multilingual translator. Your task is to accurately translate the given text from the source language to the target language, paying close attention to the requested formality level. Preserve the core meaning and nuances of the original text. Provide only the translated text as output, without any additional comments or explanations.',
    props: {
        promptTemplate: 'Translate the following text from "{sourceLang}" to "{targetLang}" with a "{formality}" formality level. Text: {userInput}',
        placeholder: 'Enter text to translate...',
        formalityLevels: ['Formal (Business)', 'Neutral (Default)', 'Informal (Conversational)'],
    },
    context: {
        purpose: "Translates text between a wide range of languages accurately.",
        benefit: "Overcomes language barriers in communication, whether for business, travel, or learning, with added control over the tone of the output.",
        proFeature: "Use the 'Formality' setting to get translations suitable for different contexts, and use the text-to-speech button to hear the correct pronunciation."
    }
  },
    {
    id: 'review-responder',
    name: 'Review & Feedback Responder',
    description: 'Suggests thoughtful, brand-consistent replies to customer reviews and feedback.',
    category: ToolCategory.Communication,
    icon: <ChatBubbleBottomCenterTextIcon />,
    component: ToolComponentType.DualTextareaTool,
    systemInstruction: 'You are a customer relationship expert specializing in online reputation management. Your task is to write a professional, empathetic, and brand-consistent reply to the customer review. Your response should address specific points from the review and reflect the desired stance provided in the context.',
    props: {
        promptTemplate: 'The customer review is: "{userInput1}". Our desired stance/context for the reply is: "{userInput2}". Please draft a suitable response.',
        placeholder1: 'Paste the customer review here. e.g., "The product broke after one week. Very disappointed!"',
        label1: 'Customer Review/Feedback',
        placeholder2: 'e.g., "Apologize sincerely, offer a free replacement, and provide a support email link."',
        label2: 'Desired Stance / Context for Reply',
    },
    context: {
        purpose: 'Generates professional responses to customer reviews for platforms like Google, Yelp, or e-commerce sites.',
        benefit: 'Saves time and helps maintain a positive brand image by crafting thoughtful and consistent replies to both positive and negative feedback.',
        proFeature: 'Use the "Desired Stance" box to guide the AI, whether you want to be "apologetic," "thankful," or "defensive with facts."'
    }
  },
  {
    id: 'message-reply-generator',
    name: 'Message Reply Generator',
    description: 'Generate sophisticated, goal-oriented replies to any message or email.',
    category: ToolCategory.Communication,
    icon: <ArrowUturnLeftIcon />,
    component: ToolComponentType.MessageReplyTool,
    systemInstruction: 'You are a professional communication assistant. Your task is to generate 2-3 distinct, context-aware replies to a given message based on the user\'s specified goal, tone, and formality. Each variation should be clearly labeled using Markdown headings (e.g., ### Variation 1).',
    props: {
      promptTemplate: 'The original message is: "{userInput}". My goal is to "{intent}". The tone should be "{tone}" with "{formality}" formality. Optional context: "{context}". Please generate 2-3 distinct reply variations based on this.',
      placeholder: 'Paste the message or email you received here...',
      contextPlaceholder: 'e.g., This is from my boss, or This is an angry customer.',
      intents: ['Accept Invitation', 'Politely Decline', 'Request More Information', 'Acknowledge Receipt', 'Express Gratitude'],
      tones: ['Friendly', 'Formal', 'Assertive', 'Empathetic'],
      formalities: ['Casual', 'Neutral', 'Very Formal'],
    },
    context: {
      purpose: "Crafts multiple, nuanced reply options for emails and messages.",
      benefit: "Saves time and reduces communication anxiety by generating professional, appropriate responses for any situation.",
      proFeature: "Use the 'Context' field to provide details like 'This is from an angry customer' to get highly tailored de-escalation responses."
    }
  },
  {
    id: 'follow-up-generator',
    name: 'Follow-Up Reminder Generator',
    description: 'Creates timely, polite follow-up reminders for emails, DMs, and project threads.',
    category: ToolCategory.Communication,
    icon: <ClockIcon />,
    component: ToolComponentType.DualTextareaTool,
    systemInstruction: 'You are a highly organized and professional executive assistant. Your task is to write a polite, concise, and effective follow-up message. The message should gently remind the recipient of the original message without sounding demanding, and it should have a clear call-to-action.',
    props: {
        promptTemplate: 'The original message was about: "{userInput1}". The goal of this follow-up is: "{userInput2}". Please draft a polite and effective follow-up email.',
        placeholder1: 'Briefly describe the original message. e.g., "The proposal I sent last Tuesday regarding the Q4 marketing budget."',
        label1: 'Original Message Context',
        placeholder2: 'e.g., "To get their feedback on the proposal and see if they have any questions."',
        label2: 'Goal of This Follow-Up',
    },
    context: {
        purpose: 'Drafts professional follow-up emails to get responses without being pushy.',
        benefit: 'Improves response rates and keeps conversations moving forward, saving you the mental energy of crafting the perfect reminder.',
        proFeature: 'In the "Goal" box, specify how much time has passed (e.g., "It has been one week") to get a more context-aware message.'
    }
  },
    {
    id: 'faq-reply-generator',
    name: 'FAQ & Help Desk Responder',
    description: 'Handles customer inquiries by suggesting prompt, accurate help desk or FAQ responses.',
    category: ToolCategory.Communication,
    icon: <QuestionMarkCircleIcon />,
    component: ToolComponentType.DualTextareaTool,
    systemInstruction: 'You are a knowledgeable and patient customer support agent for a help desk. Your primary goal is to provide a clear, helpful, and empathetic answer to the customer\'s question. Use the provided knowledge base information to formulate your response. If the information is not in the knowledge base, state that you will need to find out and will get back to them.',
    props: {
        promptTemplate: 'The customer\'s question is: "{userInput1}". The relevant information from our knowledge base is: "{userInput2}". Please draft a helpful and clear response to the customer.',
        placeholder1: 'Paste the customer\'s question here. e.g., "How do I reset my password?"',
        label1: 'Customer Question',
        placeholder2: 'Provide any relevant info, FAQs, or documentation. e.g., "To reset a password, users must go to the login page, click \'Forgot Password\', and follow the email instructions."',
        label2: 'Knowledge Base / Context',
    },
    context: {
        purpose: 'Generates accurate and polite responses to common customer support questions.',
        benefit: 'Speeds up response times for customer service teams and ensures the information provided is consistent and accurate, improving customer satisfaction.',
        proFeature: 'Paste a long document into the "Knowledge Base" box and let the AI find the relevant information to answer the question.'
    }
  },
  {
    id: 'notice-message-generator',
    name: 'Notice Message Generator',
    description: 'Create clear, structured notices for internal communications like maintenance or policy updates.',
    category: ToolCategory.Communication,
    icon: <ExclamationTriangleIcon />,
    component: ToolComponentType.NoticeGeneratorTool,
    systemInstruction: 'You are a corporate communications specialist. Your task is to generate a clear, professional notice message formatted for a specific channel, based on structured user inputs.',
    props: {
      promptTemplate: `
        Generate a notice message with the following details:
        - Notice Type: {noticeType}
        - Target Audience: {audience}
        - Channel: {channel}
        - Urgency: {urgency}
        - Date & Time of Event: {dateTime}
        - Services/Areas Affected: {affectedServices}
        - Reason/Purpose: {reason}
        - Contact Person for Questions: {contactPerson}

        The message should be formatted appropriately for the "{channel}" channel (e.g., with a subject line for email), be clear, concise, and convey the correct level of "{urgency}".
      `,
      noticeTypes: ['Scheduled Maintenance', 'Office Closure', 'Policy Update', 'System Outage', 'Event Reminder'],
      channels: ['Email', 'Slack/Teams', 'Intranet Post'],
      urgencyLevels: ['Informational', 'Action Required', 'Urgent'],
    },
    context: {
      purpose: "Generates structured, professional notices for internal company communications.",
      benefit: "Ensures clarity and consistency in important announcements, reduces confusion, and saves time drafting messages from scratch.",
      proFeature: "Select the 'Channel' (e.g., Email, Slack) and 'Urgency' to get a message perfectly formatted and toned for its purpose."
    }
  },
  {
      id: 'announcement-generator',
      name: 'Announcement Generator',
      description: 'Generate multi-channel announcements for product launches, new hires, or company milestones.',
      category: ToolCategory.Communication,
      icon: <MegaphoneIcon />,
      component: ToolComponentType.AnnouncementGeneratorTool,
      systemInstruction: `You are a senior public relations and corporate communications manager. Your task is to generate a package of content for a major announcement, tailored for different channels. The output must be in Markdown format, with each channel's content under a clear heading (e.g., ### Press Release Draft). You must incorporate the user's specified Call-to-Action and include a placeholder for a quote where appropriate (e.g., in the press release).`,
      props: {
          promptTemplate: `
          Generate an announcement package for the following:
          - Announcement Type: {announcementType}
          - Details: {userInput}
          - Call to Action: {cta}
  
          The package must include:
          1.  A professional Press Release draft (including a headline, dateline, introduction, body paragraphs, a placeholder like [Insert quote from CEO/Team Lead here], about section, and media contact).
          2.  An engaging LinkedIn post (professional tone, using hashtags).
          3.  A short, punchy Twitter/X post (concise, with hashtags).
          4.  An enthusiastic internal Email for the team (celebratory tone).
          `,
          placeholder: 'Provide all the key details for the announcement. e.g., We are launching our new product "SynthWave AI" on October 26th. It helps musicians generate royalty-free background music...',
          ctaPlaceholder: 'e.g., Visit our new landing page at synthwave.ai',
          announcementTypes: ['New Hire/Promotion', 'Product Launch', 'Company Milestone', 'Partnership News', 'Event Announcement'],
      },
      context: {
          purpose: "Creates a complete communication package for a major announcement, with content tailored for multiple channels.",
          benefit: "Saves hours of work and ensures a consistent, professional message across your press release, social media, and internal communications.",
          proFeature: "The tool automatically generates content for a press release, LinkedIn, Twitter/X, and an internal email all at once."
      }
  },
    {
    id: 'event-invitation-creator',
    name: 'Event Invitation Creator',
    description: 'Designs and crafts personalized invitations for meetings, webinars, or events.',
    category: ToolCategory.Communication,
    icon: <TicketIcon />,
    component: ToolComponentType.SingleSelectTool,
    systemInstruction: 'You are a professional event coordinator and copywriter. Your task is to write a clear, engaging, and informative invitation based on the provided details. The invitation should be persuasive and encourage recipients to RSVP. The tone should match the event type.',
    props: {
        promptTemplate: 'Write an invitation for a "{selectValue}" based on the following details: {userInput}. The invitation should include a catchy opening, key details (what, when, where), a clear call-to-action for RSVP, and a closing.',
        placeholder: 'Enter all event details: Event Title, Date, Time, Location (or virtual link), Purpose/Agenda, Speaker (if any), RSVP deadline...',
        select: {
          label: 'Event Type',
          options: ['Business Meeting', 'Webinar', 'Corporate Party', 'Networking Event', 'Workshop'],
        },
    },
    context: {
        purpose: 'Generates professional and engaging text for event invitations.',
        benefit: 'Quickly creates polished invitations that improve RSVP rates by clearly communicating value and details to attendees.',
        proFeature: 'Specify the target audience in the details (e.g., "for senior executives") to get a more appropriately toned invitation.'
    }
  },
  {
    id: 'voice-message-generator',
    name: 'Voice Message Generator',
    description: 'Converts text into natural-sounding voice messages for hands-free communications.',
    category: ToolCategory.Communication,
    icon: <WaveformIcon />,
    component: ToolComponentType.VoiceMessageTool,
    systemInstruction: '', // Not needed, this tool uses browser TTS.
    props: {
        placeholder: 'Enter the text you want to convert to speech...',
    },
    context: {
        purpose: 'Converts any written text into a spoken audio message using your browser\'s built-in voices.',
        benefit: 'Creates audio versions of text for accessibility, proof-listening, or hands-free communication.',
        proFeature: 'You can adjust the voice, pitch, and speed to customize the audio output to your liking.'
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
    featured: true,
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
    id: 'subject-line-generator',
    name: 'Email Subject Line Generator',
    description: 'Crafts attention-grabbing subject lines to maximize open rates for email campaigns.',
    category: ToolCategory.Marketing,
    icon: <EnvelopeOpenIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: 'You are a world-class direct-response copywriter specializing in email marketing. Your task is to generate 5-10 compelling and high-converting email subject lines based on the user\'s input. Provide a variety of styles, including urgency, curiosity, benefit-driven, and personalized subject lines. Clearly label each style.',
    props: {
        promptTemplate: 'Generate 5-10 compelling email subject lines for an email about: {userInput}. Provide a mix of styles.',
        placeholder: 'Enter the topic or paste the body of your email here...',
    },
    context: {
        purpose: 'Generates multiple, creative subject lines for an email.',
        benefit: 'Dramatically improves email open rates by creating subject lines that are designed to capture attention and drive engagement.',
        proFeature: 'Specify the target audience (e.g., "for a B2B audience of software developers") to get more tailored and effective subject lines.'
    }
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
    id: 'syllabus-designer',
    name: 'AI Curriculum & Syllabus Designer',
    description: 'Generate a complete syllabus with topics, readings, and objectives from a course idea.',
    category: ToolCategory.Learning,
    icon: <ClipboardListIcon />,
    component: ToolComponentType.SyllabusDesignerTool,
    systemInstruction: "You are an expert curriculum designer and university professor. Generate a comprehensive, well-structured syllabus in Markdown format based on the user's input. The syllabus must include learning objectives, a week-by-week schedule with topics, suggested assignments, and a 'Suggested Readings' section. For the readings, use your knowledge but also leverage web search to find relevant, publicly accessible academic papers, articles, or book chapters, and provide direct links to them.",
    props: {
      promptTemplate: 'Generate a syllabus for a course titled "{title}" with the following description: "{description}". The course is for the "{level}" level.',
      titlePlaceholder: 'e.g., Introductory Quantum Mechanics',
      descriptionPlaceholder: 'e.g., A one-semester course covering the fundamental principles of quantum mechanics, including wave-particle duality, the Schrödinger equation, and quantum tunneling.',
      levels: ['Undergraduate', 'Graduate', 'Doctoral'],
    },
    context: {
      purpose: "Generates a complete, structured syllabus draft from a course concept.",
      benefit: "Massively accelerates the course design process for faculty, ensuring a high standard of curriculum structure and providing a solid foundation for a new course.",
      proFeature: "The 'Suggested Readings' are powered by Google Search to provide up-to-date and relevant academic resources with links."
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
  {
    id: 'admissions-essay-analyzer',
    name: 'Admissions Essay Thematic Analyzer',
    description: 'Analyze admissions essays for themes, clarity, and potential integrity issues.',
    category: ToolCategory.Learning,
    icon: <ClipboardCheckIcon />,
    component: ToolComponentType.EssayAnalyzerTool,
    systemInstruction: "You are an experienced admissions officer at a top-tier university. Your task is to analyze one or more admissions essays. Provide a concise report in Markdown format that includes: 1. **Thematic Analysis**: A bulleted list of the main themes and arguments. 2. **Clarity & Writing Quality**: A brief assessment of the writing style and clarity (1-3 sentences). 3. **Integrity Check**: A section that flags any potential issues, such as overly generic phrasing, clichés, or language patterns that might suggest the use of an AI writing tool or plagiarism. Be cautious and frame these as 'points for further review' rather than definitive accusations.",
    props: {
        promptTemplate: 'Analyze the following admissions essay(s) and provide a report covering Thematic Analysis, Writing Quality, and an Integrity Check: {userInput}',
        placeholder: 'Paste one or more admissions essays here. Separate multiple essays with a line of "---".',
    },
    context: {
        purpose: 'Acts as a pre-screening tool for admissions departments to analyze application essays.',
        benefit: 'Streamlines the admissions process by helping staff quickly identify key themes, assess writing quality, and flag essays for further human review, allowing for more effective evaluation at scale.',
        proFeature: 'Paste multiple essays separated by "---" to get a comparative analysis in a single run.'
    }
  },
  {
    id: 'student-retention-modeler',
    name: 'Student Retention Risk Modeler',
    description: 'Analyze anonymized student data to identify patterns and factors correlated with attrition risk.',
    category: ToolCategory.Learning,
    icon: <ChartPieIcon />,
    component: ToolComponentType.Generic,
    systemInstruction: "You are a data scientist specializing in educational data mining. Your task is to analyze a large, anonymized dataset description to identify patterns and factors correlating with student attrition risk. **You must not attempt to identify individual students.** Your output should be a report summarizing key findings in a clear, actionable format for university administrators. Start the report with a bold disclaimer: **This analysis is based on anonymized, aggregated data and should be used to design support programs, not to target individual students.**",
    props: {
        promptTemplate: 'Analyze the following anonymized institutional data to find factors that correlate with student attrition: {userInput}',
        placeholder: "Describe your anonymized dataset here. e.g., 'Dataset includes: course drop rates, first-year GPA, library usage frequency, LMS activity logs, declared major, and a binary 'dropped_out' variable...'",
    },
    context: {
        purpose: "Identifies high-level patterns in anonymized data that correlate with student dropout rates.",
        benefit: "Empowers institutions to be proactive by designing targeted support programs for at-risk student populations, improving overall student success and retention.",
        proFeature: "For a more focused analysis, ask the AI to 'focus specifically on the correlation between first-semester grades and second-year retention'."
    }
  },
  {
    id: 'course-catalog-validator',
    name: 'Automated Course Catalog & Prerequisite Validator',
    description: 'Generate optimal, conflict-free semester plans based on a course catalog and student\'s progress.',
    category: ToolCategory.Learning,
    icon: <MapIcon />,
    component: ToolComponentType.DualTextareaTool,
    systemInstruction: "You are an expert university academic advisor and registrar. Your task is to analyze a provided course catalog and a student's record to generate an optimal, conflict-free semester-by-semester plan for timely graduation. The output should be clearly structured. Start your response with a bold disclaimer: **Disclaimer: This is an AI-generated academic plan. It is a suggestion and must be verified with a human academic advisor before registration.**",
    props: {
        promptTemplate: 'Given the course catalog below, and the student\'s record, create an optimal semester-by-semester plan to graduation.\n\nCourse Catalog:\n{userInput1}\n\nStudent Record:\n{userInput2}',
        label1: 'Course Catalog & Prerequisites',
        placeholder1: 'Paste the relevant course catalog information here. e.g., "CS101: Intro to Programming. CS201: Data Structures (Prereq: CS101). MATH150: Calculus I..."',
        label2: 'Student\'s Major & Completed Courses',
        placeholder2: 'e.g., "Major: Computer Science. Completed: CS101, MATH150..."',
    },
    context: {
        purpose: "Creates an optimal, semester-by-semester academic plan for students.",
        benefit: "Reduces human error in academic advising, helps students plan their journey efficiently, and prevents last-minute graduation roadblocks caused by missed prerequisites.",
        proFeature: "Add constraints to the student record like 'Cannot take more than 15 credits per semester' or 'Prefers to take summer classes' for a more tailored plan."
    }
  },
  // --- Research & Review ---
    {
    id: 'sentiment-analyzer',
    name: 'Sentiment Analyzer',
    description: 'Analyze text to determine its sentiment, emotions, and key topics.',
    category: ToolCategory.Research,
    icon: <FaceSmileIcon />,
    component: ToolComponentType.SentimentAnalyzerTool,
    systemInstruction: `You are an expert in Natural Language Processing and sentiment analysis. Your task is to analyze the provided text and return a structured JSON object with the following schema. Provide only the raw JSON object and nothing else.
Schema:
{
  "overall_sentiment": "string (Positive, Negative, or Neutral)",
  "sentiment_score": "number (from -1.0 for very negative, to 1.0 for very positive)",
  "key_emotions": "array of strings (e.g., ['Joy', 'Anger', 'Surprise'])",
  "summary": "string (A brief, one-sentence explanation for the sentiment analysis.)"
}`,
    props: {
        placeholder: 'Paste the text you want to analyze here, such as a customer review, social media comment, or document.',
    },
    context: {
        purpose: 'Identifies the emotional tone and sentiment of any piece of text.',
        benefit: 'Provides quick insights into customer feedback, social media conversations, or any text, helping you understand audience perception without manual reading.',
        proFeature: 'The tool provides a structured JSON output, making it useful for developers who want to integrate sentiment analysis into their own applications.'
    }
  },
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
    id: 'grant-proposal-assistant',
    name: 'Grant Proposal Assistant',
    description: 'Draft a grant proposal, identify funding bodies, and refine your research impact statement.',
    category: ToolCategory.Research,
    icon: <RocketLaunchIcon />,
    component: ToolComponentType.GrantProposalTool,
    systemInstruction: "You are a seasoned research administrator and grant writing expert. Your task is to draft a compelling grant proposal based on a research idea, tailored to the specific guidelines of a funding body. The draft should include sections like Introduction/Background, Research Aims, Methodology, and a persuasive Impact Statement. You should also suggest 2-3 other potential funding bodies that would be a good fit for this type of research.",
    props: {
        promptTemplate: 'Draft a grant proposal for the funding body "{fundingBody}" based on the following research idea: {userInput}',
        placeholder: 'Describe your research idea in detail, including its background, primary objectives, and potential impact...',
        fundingBodyLabel: 'Target Funding Body',
        fundingBodyPlaceholder: 'e.g., NIH, NSF, or specific foundation name',
    },
    context: {
        purpose: 'Helps faculty draft high-quality grant proposals tailored to specific funding bodies.',
        benefit: 'Increases the quality and success rate of grant applications by providing a structured draft, which helps bring more funding and prestige to the institution.',
        proFeature: 'If you are unsure of the funding body, you can type "Suggest some" and the AI will provide ideas based on your research topic.'
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
      purpose: "Creates a well-formed, testable hypotheses from a research idea.",
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
    featured: true,
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
        benefit: "Dramatically improves the quality and reliability of AI-generated content by providing a clear, detailed, and unambiguous instructions.",
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
    featured: true,
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
        promptTemplate: 'Translate the following request into an SQL query: {userInput}',
        placeholder: 'e.g., "Find all users from California who signed up in the last month."\n\nTo get a more accurate query, you can optionally provide your table schema below your request. For example:\n\n---\nSchema:\nusers(id, name, email, signup_date, state)\norders(id, user_id, amount, date)',
    },
    context: {
        purpose: 'Converts natural language questions into SQL queries.',
        benefit: 'Empowers non-technical users to query databases and saves developers time writing boilerplate SQL.',
        proFeature: 'Provide a schema description in the prompt for more accurate queries tailored to your database structure.'
    }
  },
];