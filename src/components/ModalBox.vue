<template>
  <div
    class="modal fade"
    id="modalDelete"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Hapus Contact</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger bg-danger"
            data-bs-dismiss="modal"
          >
            No
          </button>

          <form method="POST" action="/contact?_method=DELETE">
            <input id="confirm-delete" type="hidden" name="id" />
            <button type="submit" class="btn btn-primary bg-primary">
              Yes
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
