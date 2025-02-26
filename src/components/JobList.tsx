"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
}

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        setJobs(data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-4">
      <h1 className="text-3xl font-bold text-center">Job Listings</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center">No jobs found.</p>
      ) : (
        jobs.map((job) => (
          <Card key={job.id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <p className="text-sm text-gray-500">{job.company} - {job.location}</p>
            </CardHeader>
            <CardContent>
              <p>{job.description}</p>
              <p className="mt-2 text-green-600 font-bold">${job.salary}</p>
              <Button className="mt-4">Apply Now</Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
