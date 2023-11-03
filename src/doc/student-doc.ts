/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         username:
 *           type: string
 *           description: username
 *         email:
 *           type: string
 *           description: email
 *         firstName:
 *           type: string
 *           description: first name
 *         lastName:
 *           type: string
 *           description: last name
 *       example:
 *         username: student1
 *         email: sample@gmail.com
 *         firstName: john
 *         lastName: ferguson
 *
 */

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student Management API
 */

/**
 * @swagger
 * /api/v1/auth/students:
 *   post:
 *     summary: create a new student
 *     description: create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserSuccessResponse'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIException'
 *       401:
 *         description: unauthorized request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIException'
 *       409:
 *         description: conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIException'
 *       422:
 *         description: validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIException'
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIException'
 *
 */
