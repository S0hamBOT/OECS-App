import React, { createContext, useState, useContext, ReactNode } from 'react';

interface StudentInfo {
  greScore: string;
  ieltsScore: string;
  reasonForStudying: string;
  preferredCountries: string[];
  preferredUniversities: string[];
}

interface StudentContextType {
  studentInfo: StudentInfo;
  hasCompletedForm: boolean;
  updateStudentInfo: (info: StudentInfo) => void;
  completeForm: () => void;
  resetForm: () => void;
}

const defaultStudentInfo: StudentInfo = {
  greScore: '',
  ieltsScore: '',
  reasonForStudying: '',
  preferredCountries: [],
  preferredUniversities: [],
};

const StudentContext = createContext<StudentContextType>({
  studentInfo: defaultStudentInfo,
  hasCompletedForm: false,
  updateStudentInfo: () => {},
  completeForm: () => {},
  resetForm: () => {},
});

export const useStudentContext = () => useContext(StudentContext);

interface StudentProviderProps {
  children: ReactNode;
}

export const StudentProvider: React.FC<StudentProviderProps> = ({ children }) => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(defaultStudentInfo);
  const [hasCompletedForm, setHasCompletedForm] = useState(false);

  const updateStudentInfo = (info: StudentInfo) => {
    setStudentInfo(info);
  };

  const completeForm = () => {
    setHasCompletedForm(true);
  };

  const resetForm = () => {
    setStudentInfo(defaultStudentInfo);
    setHasCompletedForm(false);
  };

  return (
    <StudentContext.Provider
      value={{
        studentInfo,
        hasCompletedForm,
        updateStudentInfo,
        completeForm,
        resetForm,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};