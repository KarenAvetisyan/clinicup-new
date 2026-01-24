  </main>

        <!-- футер -->
        <footer class="footer">
            <div class="container">
                <div class="row footer-top">
                    <div class="cl-x-5">
                        <div class="_title">
                            <h2 class="footer-title">Мировая команда разработчиков</h2>
                            <p class="_title-subtxt _c-dark-05">Наша команда состоит из ведущих специалистов в области медицинских технологий, с богатым международным опытом. Мы обеспечиваем высочайший уровень разработки, соответствующий мировым стандартам.</p>
                        </div>
                        <div class="footer-contact _flex-top">
                            <p class="_mb-0">
                                <a class="footer-contact__tel _fw-600" href="tel:+74999110003">+7 (499) 911-00-03</a>
                                <a class="_c-pink _fs-18" href="mailto:admin@clinicup.ru">admin@clinicup.ru</a>
                            </p>
                            <ul class="_socials">
                                <li><a href="#"><i class="icon icon-tg"></i></a></li>
                                <li><a href="#"><i class="icon icon-ws"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="cl-x-7">
                        <form class="_form" action="mail.php" method="POST" autocomplete="off">
                            <?php include('form-fields.php'); ?>
                            <div class="_form-group__agree">
                                <label class="_form-group _form-group__agree-label _mb-0">
                                    <input class="_form-group__agree-input _req" type="checkbox" name="agree">
                                    <p class="_c-dark-05 _mb-0 _fs-14">Даю согласие на обработку персональных данных в соответствии с <a href="#" class="_c-pink">политикой конфиденциальности</a> ресурса</p>
                                </label>
                                <button type="submit" class="_btn-primary _form-submit" data-btnfrom="Футер форма">Отправить заявку <i class="icon"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="container">
                    <div class="_w-100 _fs-15-res _c-dark-06 _text-center">
                        <p class="_mb-0">2025 © CLINICUP.RU Медицинская информационая система МИС</p>
                    </div>
                    <ul class="footer-bottom__list _fs-15-res _c-pink">
                        <li><a href="#">Политики конфиденциальности</a></li>
                        <li><a href="#">Условия использования</a></li>
                        <li><a href="#">Акт оплаты</a></li>
                        <li><a href="#">Товарные знаки</a></li>
                        <li><a href="#">Лицензионный договор-оферта</a></li>
                        <li><a href="#">Соглашение</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>

    <!-- modal calc form  -->
    <div class="modal" id="modalForm-calculator">
        <div class="modal-overlay" data-close-modal></div>
        <div class="m-container _shadow">
            <div class="m-close" data-close-modal></div>
            <div class="m-content">
               <h3>Отправить заявку</h3>
               <form class="_form" action="mail.php" method="POST" autocomplete="off">
                    <?php include('form-calc-fields.php'); ?>
                    <?php include('form-fields.php'); ?>
                    <div class="_form-group__agree">
                        <label class="_form-group _form-group__agree-label _mb-0">
                            <input class="_form-group__agree-input _req" type="checkbox" name="agree">
                            <p class="_c-dark-05 _mb-0 _fs-14">Даю согласие на обработку персональных данных в соответствии с <a href="#" class="_c-pink">политикой конфиденциальности</a> ресурса</p>
                        </label>
                        <button type="submit" class="_btn-primary _form-submit">Отправить заявку <i class="icon"></i></button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- modal form  -->
    <div class="modal" id="modalForm">
        <div class="modal-overlay" data-close-modal></div>
        <div class="m-container _shadow">
            <div class="m-close" data-close-modal></div>
            <div class="m-content">
               <h3>Отправить заявку</h3>
               <form class="_form" action="mail.php" method="POST" autocomplete="off">
                    <?php include('form-fields.php'); ?>
                    <div class="_form-group__agree">
                        <label class="_form-group _form-group__agree-label _mb-0">
                            <input class="_form-group__agree-input _req" type="checkbox" name="agree">
                            <p class="_c-dark-05 _mb-0 _fs-14">Даю согласие на обработку персональных данных в соответствии с <a href="#" class="_c-pink">политикой конфиденциальности</a> ресурса</p>
                        </label>
                        <button type="submit" class="_btn-primary _form-submit">Отправить заявку <i class="icon"></i></button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="js/script.js" defer></script>
    <script type="module" src="js/main.js"></script>

</body>
</html>

