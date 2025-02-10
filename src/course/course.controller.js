import Course from "./course.model.js"
import Studdent from "../Student/studdent.model.js"
import Professor from "../Professor/professor.model.js"


export const createCourse = async (req, res) => {
    try {
        const { name, description } = req.body;
        const professorId = req.user._id;

  
        const professor = await Professor.findById(professorId);
        if (!professor || professor.role !== "PROFESSOR_ROLE") {
            return res.status(403).json({
                success: false,
                message: "Solo los profesores pueden crear cursos."
            });
        }


        const course = await Course.create({
            name,
            description,
            professor: professor._id 
        });

   
        professor.coursesCreated.push(course._id);
        await professor.save();

        return res.status(201).json({
            success: true,
            message: "Curso creado exitosamente.",
            course,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Hubo un error al crear el curso.",
            error: err.message,
        });
    }
};


export const getCoursesByProfessor = async (req, res) => {
    try {
        
        const professorId = req.user._id; 


        const professor = await Professor.findById(professorId);
        if (!professor) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado",
            });
        }

        const courses = await Course.find({ professor: professorId });

        return res.status(200).json({
            success: true,
            message: "Cursos encontrados",
            name: req.user.name,
            courses
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Hubo un error al obtener los cursos",
            error: error.message
        });
    }
};


export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;


        const course = await Course.findById(id);
        
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado",
            });
        }

   
        const updatedCourse = await Course.findByIdAndUpdate(id, data, { new: true });

        return res.status(200).json({
            success: true,
            msg: 'Curso actualizado',
            name: req.user.name,
            course: updatedCourse,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "No se pudo actualizar el curso",
            error: err.message,
        });
    }
};


export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const professorId = req.user._id; 


        const course = await Course.findById(id);
        
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado"
            });
        }


    
        const updatedStudents = await Studdent.updateMany(
            { coursesAssigned: id },
            { $pull: { coursesAssigned: id } }
        );


        await Course.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Curso eliminado exitosamente",
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el curso",
            error: err.message,
        });
    }
};

//Asignar Estudiante

export const assignStudentToCourse = async (req, res) => {
    const { studentId, courseId } = req.body;
    try {
        const student = await Studdent.findById(studentId);
        const course = await Course.findById(courseId);

        if (!student || student.role !== "STUDENT_ROLE") {
            return res.status(400).json({
                success: false,
                message: "El usuario no es un alumno válido"
            });
        }

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado"
            });
        }


        if (course.studentsAssigned.includes(studentId)) {
            return res.status(400).json({
                success: false,
                message: "El estudiante ya está asignado a este curso"
            });
        }


        if (student.coursesAssigned.length >= 3) {
            return res.status(400).json({
                success: false,
                message: "El alumno ya está asignado a 3 cursos"
            });
        }


        student.coursesAssigned.push(courseId);
        await student.save();


        course.studentsAssigned.push(studentId);
        await course.save();

        return res.status(200).json({
            success: true,
            message: "Estudiante asignado al curso con éxito",
            student,
            course
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al asignar estudiante al curso",
            error: error.message
        });
    }
};

export const getStuddentsWithCourses = async (req, res) => {
    try {
        const studdents = await Studdent.find()
            .populate({
                path: "coursesAssigned", 
                select: "name" 
            });

        return res.status(200).json({
            success: true,
            total: studdents.length,
            studdents: studdents.map(studdent => {
                return {
                    ...studdent.toJSON(), 
                    coursesAssigned: studdent.coursesAssigned.map(course => course.name) 
                };
            })
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        });
    }
};