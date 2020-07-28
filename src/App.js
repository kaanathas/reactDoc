import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RedocStandalone } from 'redoc';
import yaml from 'js-yaml';

const yamlStr = `
openapi: 3.0.2
info:
  title: MediaServer
  version: 1.0.0
  x-logo:
    url: >-
      https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRoDjaL6CD4amMOYsA6Z-DTfXJvP57pU1YL0Q&usqp=CAU
    altText: MediaServices
  description: Maintain the work flow of file uploading
tags:
  - name: user
    description: user details
  - name: file
    description: file details
x-tagGroups:
  - name: General
    tags:
      - user
      - file
servers:
  - url: 'http://www.kaanathas.com:80/api'
    description: base end point
paths:
  /user:
    summary: All registed user
    description: User details who are registed for the media servie
    get:
      tags:
        - user
      responses:
        '200':
          content:
            application/json:
              schema: &ref_0
                title: Root Type for user
                description: Basic User info for auth purpose
                type: object
                properties:
                  email:
                    type: string
                  password:
                    type: string
                  token:
                    description: this token use for login
                    type: integer
                  id:
                    description: ''
                    type: integer
                example:
                  email: kaanathas087@gmail.com
                  password: 3456@53773
          description: registed users are fetch
        '404': &ref_2
          description: this request is not allowed
      security:
        - BasicAuth: []
      operationId: GetAllUsers
      summary: All Users information will get
      description: >-
        All user details will return so we can see how many and who are
        registerd in the services
      x-codeSamples:
        - lang: Java + Okhttp
          source: |-
            OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
              .url("http://www.kaanathas.com:80/api/user")
              .get()
              .build();

            Response response = client.newCall(request).execute();
        - lang: C + Libcurl
          source: >-
            CURL *hnd = curl_easy_init();


            curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "GET");

            curl_easy_setopt(hnd, CURLOPT_URL,
            "http://www.kaanathas.com:80/api/user");


            CURLcode ret = curl_easy_perform(hnd);
    post:
      requestBody:
        description: |-
          "email"
          "password"
        content:
          application/json:
            schema: *ref_0
        required: true
      tags:
        - user
      responses:
        '200':
          content:
            application/json: {}
          description: user registeration successfull
        '401':
          content:
            text/xml: {}
          description: registration operation is failed
      operationId: userRegistertions
      summary: register a user
      description: it is register the new user for the media services
      x-codeSamples:
        - lang: Java + Okhttp
          source: >-
            OkHttpClient client = new OkHttpClient();


            MediaType mediaType = MediaType.parse("application/json");

            RequestBody body = RequestBody.create(mediaType,
            "{\"email\":\"kaanathas087@gmail.com\",\"password\":\"3456@53773\"}");

            Request request = new Request.Builder()
              .url("http://www.kaanathas.com:80/api/user")
              .post(body)
              .addHeader("content-type", "application/json")
              .build();

            Response response = client.newCall(request).execute();
        - lang: C + Libcurl
          source: >-
            CURL *hnd = curl_easy_init();


            curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "POST");

            curl_easy_setopt(hnd, CURLOPT_URL,
            "http://www.kaanathas.com:80/api/user");


            struct curl_slist *headers = NULL;

            headers = curl_slist_append(headers, "content-type:
            application/json");

            curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);


            curl_easy_setopt(hnd, CURLOPT_POSTFIELDS,
            "{\"email\":\"kaanathas087@gmail.com\",\"password\":\"3456@53773\"}");


            CURLcode ret = curl_easy_perform(hnd);
  '/user/{email}':
    summary: user email details are use for activities
    description: 'email detail unique  each user '
    get:
      tags:
        - user
      responses:
        '200':
          content:
            application/json:
              schema: *ref_0
          description: suceesfull a user registed via this email
        '404':
          content:
            text/xml: {}
          description: No user is registed via this email
      security:
        - BasicAuth: []
      operationId: findUserByEmail
      summary: find the user
      description: >-
        return the user who has this email address which is registed to this
        services
      x-codeSamples:
        - lang: Java + Okhttp
          source: |-
            OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
              .url("http://www.kaanathas.com:80/api/user/%7Bemail%7D")
              .get()
              .build();

            Response response = client.newCall(request).execute();
        - lang: C + Libcurl
          source: >-
            CURL *hnd = curl_easy_init();


            curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "GET");

            curl_easy_setopt(hnd, CURLOPT_URL,
            "http://www.kaanathas.com:80/api/user/%7Bemail%7D");


            CURLcode ret = curl_easy_perform(hnd);
    parameters:
      - examples:
          email:
            value: kaanathas087@gmail.com
        name: email
        description: find the scpefic user
        schema:
          type: string
        in: path
        required: true
  '/file/{id}':
    summary: file have unique id
    description: from file id can identify the file
    get:
      tags:
        - file
      responses:
        '200':
          content:
            application/json:
              schema: &ref_1
                title: Root Type for FileInfo
                description: This information for file operations
                type: object
                properties:
                  name:
                    type: string
                  UploadBy:
                    type: string
                  fileAccess:
                    type: string
                  description:
                    type: string
                  id:
                    description: ''
                    type: integer
                example:
                  name: cv.pdf
                  UploadBy: kaanathas087@gmail.com
                  fileAccess: private
                  description: cv details of user
          description: file is retrive suceesful
        '404':
          content:
            text/xml:
              schema:
                type: string
          description: invalid id is passed
      security:
        - BasicAuth: []
      operationId: FileFindById
      summary: find a file
      description: return the file which is have the file id
      x-codeSamples:
        - lang: Java + Okhttp
          source: |-
            OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
              .url("http://www.kaanathas.com:80/api/file/%7Bid%7D")
              .get()
              .build();

            Response response = client.newCall(request).execute();
        - lang: C + Libcurl
          source: >-
            CURL *hnd = curl_easy_init();


            curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "GET");

            curl_easy_setopt(hnd, CURLOPT_URL,
            "http://www.kaanathas.com:80/api/file/%7Bid%7D");


            CURLcode ret = curl_easy_perform(hnd);
    put:
      requestBody:
        description: public
        content:
          application/json:
            schema:
              type: string
            examples:
              public:
                value: '"public"'
        required: true
      tags:
        - file
      responses:
        '200':
          content:
            application/json: {}
          description: successfully updated file access state
        '401':
          description: un authorized person cant make change operation failed
      operationId: accessChange
      summary: update the access
      description: to change the access private to public
      x-codeSamples:
        - lang: Java + Okhttp
          source: |-
            OkHttpClient client = new OkHttpClient();

            MediaType mediaType = MediaType.parse("application/json");
            RequestBody body = RequestBody.create(mediaType, "\"string\"");
            Request request = new Request.Builder()
              .url("http://www.kaanathas.com:80/api/file/%7Bid%7D")
              .put(body)
              .addHeader("content-type", "application/json")
              .build();

            Response response = client.newCall(request).execute();
        - lang: C + Libcurl
          source: >-
            CURL *hnd = curl_easy_init();


            curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "PUT");

            curl_easy_setopt(hnd, CURLOPT_URL,
            "http://www.kaanathas.com:80/api/file/%7Bid%7D");


            struct curl_slist *headers = NULL;

            headers = curl_slist_append(headers, "content-type:
            application/json");

            curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);


            curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, "\"string\"");


            CURLcode ret = curl_easy_perform(hnd);
    delete:
      tags:
        - file
      responses:
        '200':
          content:
            application/json:
              schema:
                type: string
          description: file delete successful
        '404':
          content:
            text/xml:
              schema:
                type: string
          description: failed to delete the file
      operationId: delete file by id
      summary: delete the file
      description: This operation delete the file which is have id
      x-codeSamples:
        - lang: Java + Okhttp
          source: |-
            OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
              .url("http://www.kaanathas.com:80/api/file/%7Bid%7D")
              .delete(null)
              .build();

            Response response = client.newCall(request).execute();
        - lang: C + Libcurl
          source: >-
            CURL *hnd = curl_easy_init();


            curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "DELETE");

            curl_easy_setopt(hnd, CURLOPT_URL,
            "http://www.kaanathas.com:80/api/file/%7Bid%7D");


            CURLcode ret = curl_easy_perform(hnd);
    parameters:
      - name: token
        description: this token unique for the user
        schema:
          type: integer
        in: header
        required: true
      - examples:
          id:
            value: '1'
        name: id
        description: it is file id store with file details
        schema:
          type: integer
        in: path
        required: true
  /file:
    summary: file operations
    description: file upload and retrive all files
    get:
      tags:
        - file
      responses:
        '200':
          content:
            application/json:
              schema:
                type: array
                items: *ref_1
          description: 'successfull operation find to public files '
        '404':
          content:
            text/xml: {}
          description: failed cant got the public files
      security:
        - BasicAuth: []
      operationId: getAllPublicFiles
      summary: retrive the file which is in public access
      description: return the files which is set to public access
      x-codeSamples:
        - lang: Java + Okhttp
          source: |-
            OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
              .url("http://www.kaanathas.com:80/api/file")
              .get()
              .build();

            Response response = client.newCall(request).execute();
        - lang: C + Libcurl
          source: >-
            CURL *hnd = curl_easy_init();


            curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "GET");

            curl_easy_setopt(hnd, CURLOPT_URL,
            "http://www.kaanathas.com:80/api/file");


            CURLcode ret = curl_easy_perform(hnd);
    post:
      requestBody:
        description: send the file with form data
        content:
          multipart/form-data:
            schema: *ref_1
        required: true
      tags:
        - file
      parameters:
        - name: token
          description: this token is unique for each user
          schema:
            type: integer
          in: header
          required: true
      responses:
        '200':
          content:
            application/json: {}
          description: private file upload suceesfull
        '400':
          content:
            text/xml: {}
          description: file uploading is failed
      operationId: uploadfile
      summary: upload the file
      description: user Upload  the private file
      x-codeSamples:
        - lang: Java + Okhttp
          source: |-
            OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
              .url("http://www.kaanathas.com:80/api/file")
              .post(null)
              .addHeader("content-type", "multipart/form-data")
              .addHeader("token", "SOME_INTEGER_VALUE")
              .build();

            Response response = client.newCall(request).execute();
        - lang: C + Libcurl
          source: >-
            CURL *hnd = curl_easy_init();


            curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "POST");

            curl_easy_setopt(hnd, CURLOPT_URL,
            "http://www.kaanathas.com:80/api/file");


            struct curl_slist *headers = NULL;

            headers = curl_slist_append(headers, "content-type:
            multipart/form-data");

            headers = curl_slist_append(headers, "token: SOME_INTEGER_VALUE");

            curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);


            CURLcode ret = curl_easy_perform(hnd);
components:
  schemas:
    user: *ref_0
    FileInfo: *ref_1
  responses:
    failed: *ref_2
  securitySchemes:
    BasicAuth:
      type: apiKey
      description: this is the basic auth for access the api
      name: apikey
      in: query
security:
  - BasicAuth: []

`

const nativeObject = yaml.load(yamlStr)



function App() {
  return (
    <div className="App">
      <header className="App-header">
      <RedocStandalone spec={JSON.parse(JSON.stringify(nativeObject))}
      
      options={{
        nativeScrollbars: false,
        theme: {
          colors: { primary: { main: "blue" } },
          typography: {
            fontSize: "14px",
            code: {
              fontSize: "13px"
            }
          }
        },
        lazyRendering: true
        // scrollYOffset: 150,
      }}
      
      
      
      
      
      
      />
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
