"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchProjects, removeProjectLocal } from "../../store/slices/projectSlice";
import * as projectApi from "../../services/projectApi";
import { useAuth } from "../../hooks/useAuth";
import { languageOptions } from "../../utils/languages";
import { formatDate } from "../../utils/formatters";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Modal from "../../components/common/Modal";
import Loader from "../../components/common/Loader";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuth();
  const { items, isLoading } = useSelector((state: RootState) => state.projects);

  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [language, setLanguage] = useState(languageOptions[0].value);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    dispatch(fetchProjects());
  }, [isAuthenticated, dispatch, router]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    await projectApi.createProject({ name, language });
    setModalOpen(false);
    setName("");
    dispatch(fetchProjects());
  }

  async function handleDelete(id: string) {
    await projectApi.deleteProject(id);
    dispatch(removeProjectLocal(id));
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-semibold text-ink">Your Projects</h1>
        <Button onClick={() => setModalOpen(true)}>+ New Project</Button>
      </div>

      {isLoading && <Loader label="Loading projects..." />}

      {!isLoading && items.length === 0 && (
        <p className="text-muted">No projects yet. Create one to get started.</p>
      )}

      <ul className="flex flex-col gap-2">
        {items.map((project) => (
          <li
            key={project._id}
            className="flex items-center justify-between bg-white border border-line rounded-lg px-4 py-3 shadow-card"
          >
            <div>
              <p className="text-ink font-medium">{project.name}</p>
              <p className="text-muted text-xs">
                {project.language} · updated {formatDate(project.updatedAt)}
              </p>
            </div>
            <Button variant="danger" onClick={() => handleDelete(project._id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} title="New Project" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleCreate} className="flex flex-col gap-3">
          <Input placeholder="Project name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Select value={language} onChange={(e) => setLanguage(e.target.value as typeof language)}>
            {languageOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
          <Button type="submit">Create</Button>
        </form>
      </Modal>
    </main>
  );
}
