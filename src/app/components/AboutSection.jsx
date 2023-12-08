"use client"
import React, { useTransition, useState } from 'react'
import Image from 'next/image'
import TabButton from './TabButton'

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>NodeJS</li>
        <li>Express</li>
        <li>PostgreSQL</li>
        <li>MongoDB</li>
        <li>NextJS</li>
        <li>React</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>IBM Back-End Development</li>
        <li>Ashmole Academy</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>Application Security for Developers and DevOps Professionals</li>
        <li>AI Applications with Python and Flask</li>
        <li>Containers with Docker, Kubernetes & OpenShift</li>
        <li>Python for Data Science, AI & Development</li>
        <li>Monitoring and Observability for Development and DevOps</li>
        <li>Linux Commands and Shell Scripting</li>
        <li>Git and GitHub</li>
        <li>Application Development using Microservices and Serverless</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills")
  const [isPending, startTransition] = useTransition()

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id)
    })
  }

  return (
    <section>
      <div className="text-white">
        <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
          <Image src="/images/about-image.png" alt="about-image" priority width={500} height={500} />
          <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
            <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
            <p className='text-base lg:text-lg'>Passionate software engineer with expertise in Python, JavaScript, and C++. I thrive on turning ideas into reality through coding and creating impactful projects. Committed to a healthy lifestyle, I hit the gym to strengthen both body and mind. Outside of coding, I&apos;ve played the piano for six years, cultivating creativity and discipline.</p>
            <div className="flex flex-row justify-start mt-8">
              <TabButton selectTab={() => handleTabChange("skills")} active={tab === "skills"}>{" "}Skills{" "}</TabButton>
              <TabButton selectTab={() => handleTabChange("education")} active={tab === "education"}>{" "}Education{" "}</TabButton>
              <TabButton selectTab={() => handleTabChange("certifications")} active={tab === "certifications"}>{" "}Certifications{" "}</TabButton>
            </div>
            <div className='mt-8'>{TAB_DATA.find((t) => t.id === tab).content}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection