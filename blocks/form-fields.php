<input class="js-buttonfrom" type="hidden" name="buttonfrom" data-name="Кнопка" value="">
<div class="_form-group__wrap">
    <div class="_form-group__col">
        <!-- Название организации  -->
        <div class="_form-group__field">
            <p class="_mb-5 _fs-14 _c-dark-05">Название организации</p>
            <div class="_form-group">
                <i class="icon icon-bag2"></i>
                <input type="text" name="organisation" class="_form-group__input _req" placeholder="Введите название...">
                <div class="req__text">Обязательное поле</div>
            </div>
        </div>
        <!-- ФИО контактного лица -->
        <div class="_form-group__field">
            <p class="_mb-5 _fs-14 _c-dark-05">ФИО контактного лица</p>
            <div class="_form-group">
                <i class="icon icon-profile2"></i>
                <input type="text" name="name" class="_form-group__input _req" placeholder="ФИО контактного лица">
                <div class="req__text">Обязательное поле</div>
            </div>
        </div>
        <!-- Телефон -->
        <div class="_form-group__field">
            <p class="_mb-5 _fs-14 _c-dark-05">Телефон</p>
            <div class="_form-group">
                <i class="icon icon-tel-down"></i>
                <input type="text" name="tel" class="_form-group__input _phone phone-mask _req" placeholder="Введите телефон...">
                <div class="req__text">Обязательное поле</div>
                <div class="error__text">Пожалуйста, укажите корректный номер телефона</div>
            </div>
        </div>
    </div>
    <div class="_form-group__col">
        <!-- Email -->
        <div class="_form-group__field">
            <p class="_mb-5 _fs-14 _c-dark-05">Email</p>
            <div class="_form-group">
                <i class="icon icon-mail"></i>
                <input type="text" name="email" class="_form-group__input _req _email" placeholder="Введите электронную почту...">
                <div class="req__text">Обязательное поле</div>
                <div class="error__text">Пожалуйста, укажите корректный email</div>
            </div>
        </div>
        <!-- Примечание -->
        <div class="_form-group__field">
            <p class="_mb-5 _fs-14 _c-dark-05">Примечание</p>
            <div class="_form-group">
                <textarea name="message" placeholder="Текст сообщения..."></textarea>
            </div>
        </div>
    </div>
</div>