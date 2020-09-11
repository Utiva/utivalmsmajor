import sequelize from 'sequelize';
import models from '../database/models';
import helpers from '../helpers';

const { successStat, errorStat } = helpers;

const { Op, fn, col } = sequelize;

/**
 * / @static
 * @description Allows a staff to student
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access Token
 * @memberof contentCOntroller
 */


export const getAdminDashboard = async (req, res) => {

    try {
        const student = await models.StudentCourse.count();

        const course = await models.Course.count();

        const trainer = await models.Trainer.count();

        const studentByCourse = await models.sequelize.query(
            `SELECT "Courses"."name", COUNT("studentId") AS 
        value FROM "Courses" LEFT JOIN "StudentCourses" ON "Courses"."id" = "StudentCourses"."courseId" 
        WHERE "Courses"."id" IS NOT NULL GROUP BY "Courses"."id"`
        )
        const trainerByCourse = await models.sequelize.query(
            `SELECT "Courses"."name", COUNT("courseId") AS 
        value FROM "Courses" LEFT JOIN "Trainers" ON "Courses"."id" = "Trainers"."courseId" 
        WHERE "Courses"."id" IS NOT NULL GROUP BY "Courses"."id"`
        )

        const date = await models.sequelize.query(
            `SELECT EXTRACT(YEAR FROM "createdAt") AS YEAR, to_char("createdAt", 'Mon') AS MONTH, COUNT(*) AS COUNT FROM "StudentCourses" GROUP BY "StudentCourses"."createdAt", EXTRACT(MONTH FROM "createdAt")`
        )

        const getAll = date[0].reduce((acc, item, index) => {
            if (item) {
                acc[item.month] = acc[item.month] ? acc[item.month] + Number(item.count) : Number(item.count);

            }
            return acc;
        }, {});


        return successStat(
            res,
            200,
            'data',
            {
                student,
                course,
                trainer,
                studentByCourse: studentByCourse[0],
                trainerByCourse: trainerByCourse[0],
                studentByMonth: getAll
            }
            );
    } catch (e) {
        console.log(e)
        errorStat(res, 500, 'Operation Failed, Please Try Again');
    }
};