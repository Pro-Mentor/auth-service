/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserSuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: message of the response
 *       example:
 *         message: user created successfully
 *
 *     ErrorMessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: message of the response
 *
 *     APIException:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessageResponse'
 *         errorCode:
 *           type: string
 *           description: error code of the response
 *
 */
