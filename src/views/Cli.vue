<template>
  <section id="about" class="wrapper-cli">
    <div class="container-about mx-auto px-3">
      <div class="row d-flex justify-content-between">
        <div class="col-md-8">
          <img src="/assets/images/contacts-cli.png" alt="" />
        </div>
        <div class="col-md-4 d-flex justify-content-end deskripsi-cli">
          <ul>
            <li class="repo">
              <h2 class="fs-6">Repository</h2>
              <div
                class="d-flex align-items-center justify-content-start gap-2 mt-2"
              >
                <i class="bi bi-github fs-4"></i>
                <a
                  class="link-deskripsi-cli"
                  href="https://github.com/anggernuramin/contact-apps-cli"
                  target="_blank"
                  >anggernuramin/contact-apps-cli</a
                >
              </div>
            </li>
            <hr>

            <li>
              <h2 class="title-cli fs-6 mt-2">Dependency</h2>
              <ol class="">
                <li>
                  <div
                    class="d-flex align-items-center justify-content-start gap-2 mt-2"
                  >
                    <img
                      class="image-npm"
                      src="/assets/images/logo-npm.png"
                      alt=""
                      width="10"
                      height="10"
                    />
                    <a
                      class="link-deskripsi-cli"
                      href="https://www.npmjs.com/package/chalk"
                      target="_blank"
                      >chalk</a
                    >
                  </div>
                </li>
                <li>
                  <div
                    class="d-flex align-items-center justify-content-start gap-2 mt-2"
                  >
                    <img
                      class="image-npm"
                      src="/assets/images/logo-npm.png"
                      alt=""
                      width="10"
                      height="10"
                    />
                    <a
                      class="link-deskripsi-cli"
                      href="https://www.npmjs.com/package/yargs"
                      target="_blank"
                      >yargs</a
                    >
                  </div>
                </li>
                <li>
                  <div
                    class="d-flex align-items-center justify-content-start gap-2 mt-2"
                  >
                    <img
                      class="image-npm"
                      src="/assets/images/logo-npm.png"
                      alt=""
                      width="10"
                      height="10"
                    />
                    <a
                      class="link-deskripsi-cli"
                      href="https://www.npmjs.com/package/validator"
                      target="_blank"
                      >validator</a
                    >
                  </div>
                </li>
              </ol>
            </li>
            <hr>

          </ul>
        </div>
      </div>
      <div class="row mt-4">
        <div class="add-contacts-cli col-lg-8 align-self-center">
          <h1 class="fs-2 text-left">
            Terminal Contact Manager
          </h1>
          <p class="mt-1">
            A simple application that allows users to manage their contact list via the terminal. With this application, users can easily add, view, and delete contacts without needing a graphical interface. It's a quick and efficient solution for contact management in a text-based environment.
          </p>

          <div class="row mt-4 commands-cli">
            <div class="col-md-12 deskripsi-commands-cli">
              <h2 class="fs-4">Show All Commands Option</h2>
              <hr />
              <p>
             Allows users to view a complete list of available commands within the application. In the context of a terminal-based contact management application, this feature empowers users to easily understand and utilize commands for adding, viewing, and deleting contacts, as well as performing other relevant actions related to contact management.
              </p>
              <div class="d-flex">
                <div class="commands">
                  <h3 class="my-1">Commands</h3>
                  <p class="bash">node app --help</p>
                  <h3 class="my-2">Output</h3>
                  <img src="/assets/images/cli/all-commands.png" alt="" />
                </div>
              </div>
            </div>

            <div class="col-md-12 deskripsi-commands-cli mt-4">
              <h2 class="fs-4">Commands Add Contact</h2>
              <hr />
              <p>
                To add a new contact to the list via the terminal, users can input details such as name, phone number, and email address.
              </p>
              <div class="d-flex">
                <div class="commands">
                  <h3 class="my-1">Commands</h3>
                  <p class="bash">
                    node app add --name="name" --email="email@gmail.com"
                    --nohp="nohp"
                  </p>
                  <h3 class="my-2">Output</h3>
                  <img src="/assets/images/cli/add-contacts.png" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-4 commands-cli">
            <div class="col-md-12 deskripsi-commands-cli">
              <h2 class="fs-4">Name Contact Duplikat</h2>
              <hr />
              <p>
                The alert enables automatic detection of duplicate contacts in the list, triggered when a user adds a name already present in the contact list. The contact list prohibits storing duplicate names, aiding in avoiding unwanted duplications and maintaining an orderly and organized contact list.
              </p>
              <div class="d-flex">
                <div class="commands">
                  <h3 class="my-2">Alert</h3>
                  <img src="/assets/images/cli/alert-name.png" alt="" />
                </div>
              </div>
            </div>

            <div class="col-md-12 deskripsi-commands-cli mt-4">
              <h2 class="fs-4">Email Not Valid</h2>
              <hr />
              <p>
                Alert message appears when the entered email is not valid. To implement email validation, the system utilizes a package <a href="https://www.npmjs.com/package/validator" target="_blank">validator.</a> 
              </p>
              <div class="d-flex">
                <div class="commands">
                  <h3 class="my-2">Alert</h3>
                  <img
                    src="/assets/images/cli/alert-email-notvalid.png"
                    alt=""
                  />
                </div>
              </div>
            </div>

            
            <div class="col-md-12 deskripsi-commands-cli mt-4">
              <h2 class="fs-4">No Hp Not Valid</h2>
              <hr />
              <p>
               Alert indicates that the entered phone number does not meet the required format or criteria. To implement phone number validation, the system utilizes a package validator <a href="https://www.npmjs.com/package/validator" target="_blank">validator.</a> 
              </p>
              <div class="d-flex">
                <div class="commands">
                  <h3 class="my-2">Alert</h3>
                  <img
                    src="/assets/images/cli/alert-nohp-notvalid.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-4 commands-cli">
            <div class="col-md-12 deskripsi-commands-cli">
              <h2 class="fs-4">Commands Option Delete</h2>
              <hr />
              <p>
                To delete a specific contact from the list via the terminal based on the name. This action will permanently remove it from the contact list.
              </p>
              <div class="d-flex">
                <div class="commands">
                  <h3 class="my-1">Commands</h3>
                  <p class="bash">node app delete --name="name"</p>
                  <h3 class="my-2 ">Output</h3>
                  <img src="/assets/images/cli/delete-contact.png" alt="" />
                </div>
              </div>
            </div>

            <div class="col-md-12 deskripsi-commands-cli mt-4">
              <h2 class="fs-4">Commands Option Show Detail</h2>
              <hr />
              <p>
                To view detailed information of a specific contact from the list via the terminal based on the name. This will display information such as email and phone number.
              </p>
              <div class="d-flex">
                <div class="commands">
                  <h3 class="my-1">Commands</h3>
                  <p class="bash">
                    node app detail --name="name"
                  </p>
                  <h3 class="my-2">Output</h3>
                  <img src="/assets/images/cli/detail-contact.png" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-4 commands-cli">
           

            <div class="col-md-12 deskripsi-commands-cli mt-4">
              <h2 class="fs-4">Commands Option Show All Data</h2>
              <hr />
              <p>
                To view all stored contact data from the list via the terminal. It will display the names existing in the contact.
              </p>
              <div class="d-flex">
                <div class="commands">
                  <h3 class="my-1">Commands</h3>
                  <p class="bash">
                    node app list
                  </p>
                  <h3 class="my-2">Output</h3>
                  <img src="/assets/images/cli/show-all-contacts.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
