import { JsonController, Param, Get, Post, Req, Res, UploadedFiles, Body } from 'routing-controllers';
import { Request, Response } from 'express';
import { Multer } from 'multer';
import * as fs from 'fs';

@JsonController('/files')
// @UseBefore(JwtMiddleware)
export class FilesController {
    uploads = {};

    constructor() { }

    @Get('/get')
    async get() {
        return { ok: 'you and me' };
    }

    @Post('/uploadFiles/:folder')
    async uploadFiles(@Param('folder') folder, @UploadedFiles('files', { options: {} }) files: Express.Multer.File[], @Res() res: Response) {
        const public_folder = `../public`
        // Use fs.createWriteStream() method  
        // to write the file  
        // let writer = fs.createWriteStream(`${process.cwd()}/public/${file.originalname}`, { flags: 'w'})
        try {
            // check file existe for remove it 

            // fs.promises.access(`${process.cwd()}/public/${file.originalname}`, fs.constants.F_OK)
            // if (fs.existsSync(`${public_folder}/${file.originalname}`)) {
            //   await fs.promises.unlink(`${public_folder}/${file.originalname}`)
            // }

            await fs.promises.mkdir(`${public_folder}/${folder}`, { recursive: true })


            files.forEach(async file => {
                await fs.promises.writeFile(`${public_folder}/${folder}/${file.originalname}`,  file.buffer)
            })
        } catch (e) {
            return res.status(500).send((e as Error).message);
        }

        // Read and disply the file data on console
        // const isSuccess = writer.write(JSON.stringify(file), null, e => console.log(e));

        return { length: files.length, folder };
    }

    @Post('/deleteFiles')
    async deleteFiles(@Body() model: {filenames: string[], folder: string}, @Res() res: Response) {

        const public_folder = `../public`;

        try {
            model.filenames.forEach(async (filename, i) => {

                await fs.promises.unlink(`${public_folder}/${model.folder}/${filename}`);
    
            });
        } catch (e) {
            return res.status(500).send((e as Error).message);
        }

        return { length: model.filenames.length, folder: model.folder };
    }

    // @Post('/upload')
    // async upload(@Req() req: Request, @Res() res: Response) {
    //     const fileId = req.headers['x-file-id'] as string;
    //     const startByte = parseInt(req.headers['x-start-byte'] as string, 10);
    //     const name = req.headers['name'];
    //     const fileSize = parseInt(req.headers['size'] as string, 10);

    //     console.log('file Size', fileSize, fileId, startByte);

    //     if (this.uploads[fileId] && fileSize == this.uploads[fileId].bytesReceived) {
    //         res.end();
    //         return;
    //     }

    //     console.log('>>>>>>>>>>1');
    //     console.log(fileSize);

    //     if (!fileId) {
    //         res.writeHead(400, 'No file id');
    //         res.end(400);
    //     }

    //     console.log(`${process.cwd()}/public/${name}`);

    //     if (!this.uploads[fileId])
    //         this.uploads[fileId] = {};

    //     const upload = this.uploads[fileId]; // Bytes of file already present

    //     let fileStream;

    //     // checking bytes of file uploaded and sending to server
    //     if (!startByte) {
    //         upload.bytesReceived = 0;
    //         const name = req.headers['name'];
    //         fileStream = fs.createWriteStream(`${process.cwd()}/public/${name}`, { flags: 'w' /*with "w"(write stream ) it keeps on adding data*/ });
    //     } else {
    //         if (upload.bytesReceived != startByte) {// if same name file is sent with different size it will not upload
    //             res.writeHead(400, 'Wrong start byte');
    //             res.end(upload.bytesReceived);
    //             return;
    //         }
    //         // append to existing file
    //         fileStream = fs.createWriteStream(`${process.cwd()}/public/${name}`, {
    //             flags: 'a'
    //         });
    //     }

    //     req.on('data', function (data) {
    //         upload.bytesReceived += data.length; // adding length of data we are adding
    //     });

    //     req.pipe(fileStream);

    //     // when the request is finished, and all its data is written
    //     fileStream.on('close', function () {
    //         console.log(upload.bytesReceived, fileSize);
    //         if (upload.bytesReceived == fileSize) {
    //             console.log('Upload finished');
    //             delete this.uploads[fileId];

    //             // can do something else with the uploaded file here
    //             res.send({ status: 'uploaded' });
    //             res.end();
    //         } else {
    //             // connection lost, leave the unfinished file around
    //             console.log('File unfinished, stopped at ' + upload.bytesReceived);
    //             res.writeHead(500, 'Server Error');
    //             res.end();
    //         }
    //     });

    //     // in case of I/O error - finish the request
    //     fileStream.on('error', function (err) {
    //         console.log('fileStream error', err);
    //         res.writeHead(500, 'File error');
    //         res.end();
    //     });
    // }

    // @Get('/status')
    // async status(@Req() req: Request, @Res() res: Response) {
    //     // console.log('Successfully came');
    //     // From GET request 3 parameters below and store in variable
    //     const fileId = req.headers['x-file-id'] as string;
    //     const name = req.headers['name'];
    //     const fileSize = parseInt(req.headers['size'] as string, 10);
    //     console.log(name);
    //     if (name) {
    //         try {
    //             const stats = fs.statSync(`${process.cwd()}/public/${name}`); // grabs file information and returns
    //             // checking file exists or not
    //             if (stats.isFile()) {
    //                 console.log(`fileSize is ${fileSize} and already uploaded file size ${stats.size}`);
    //                 if (fileSize == stats.size) {
    //                     res.send({ status: 'file is present' }) // returns if file exists
    //                     return;
    //                 }
    //                 if (!this.uploads[fileId])
    //                     this.uploads[fileId] = {}
    //                 console.log(this.uploads[fileId]);
    //                 this.uploads[fileId]['bytesReceived'] = stats.size;// checks total amount of file uploaded
    //                 console.log(this.uploads[fileId], stats.size);
    //             }
    //         } catch (er) {
    //             // res.send({ 'er': (er as Error).message }) //returns if file exists
    //             console.log('**************')
    //             console.log((er as Error).message)
    //             // res.writeHead(500, (er as Error).message);
    //             console.log('**************')
    //         }

    //     }
    //     const upload = this.uploads[fileId];
    //     if (upload)
    //         return res.send({ uploaded: upload.bytesReceived }); // returns to FrontEnd amout of bytes uploaded
    //     else
    //         return res.send({ uploaded: 0 });
    // }

}
