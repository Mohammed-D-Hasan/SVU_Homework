
const books = [
    {
        isbn: "978-9770916738",
        title: "الف ليلة وليلة",
        price: "25000 ل.س",
        publisher: "دار المعارف",
        category: "قصص شعبية",
        summary: "كتاب أسطوري يضم مجموعة من القصص الشعبية من الشرق الأوسط وجنوب آسيا وشمال إفريقيا.",
        stories: ["علاء الدين والمصباح السحري", "علي بابا والأربعون حرامي", "رحلات السندباد السبع"],
        image : "images/ألف ليلة وليلة.svg"
    },
    {
        isbn: "978-9953891718",
        title: "رحلة المسعودي إلى الشرق",
        price: "12000 ل.س",
        publisher: "دار النهضة",
        category: "تاريخ",
        summary: "كتاب يروي رحلات المسعودي إلى الشرق الأوسط وآسيا.",
        stories: [],
        image : "images/المسعودي.svg"
    },
    {
        isbn: "978-9953451080",
        title: "الحضارة العربية الإسلامية",
        price: "15000 ل.س",
        publisher: "دار الفكر",
        category: "تاريخ",
        summary: "كتاب يتناول الحضارة العربية الإسلامية وتأثيرها على العالم.",
        stories: [],
        image : "images/الاسلام والحضارة العربية.svg"
    },
    {
        isbn: "978-9770923453",
        title: "سيد الخواتم - البرجان",
        price: "10000 ل.س",
        publisher: "Houghton Miffin Harcourt",
        category: "فانتازيا",
        summary: "رواية تحكي قصة أسطورية عن سيد الظلام ساورون وخاتم القوة وشعوب الهوبيت والبشر والجان والأقزام",
        stories: ["رحيل بورومير", "خيالة روهان", "رحلة إلى مفترق الطرق"],
        image : "images/سيد الخواتم.webp"
    },
    {
        isbn: "978-9770912341",
        title: "عمر يظهر في القدس",
        price: "18000 ل.س",
        publisher: "دار المعارف",
        category: "رواية تاريخية",
        summary: "رواية تاريخية تتناول فتح القدس في عهد عمر بن الخطاب.",
        stories: [],
        image : "images/عمر يظهر في القدس.jpeg"
    },
    {
        isbn: "978-9770915670",
        title: "القرآن الكريم",
        price: "5000 ل.س",
        publisher: "دار المعارف",
        category: "ديني",
        summary: "الكتاب المقدس في الإسلام.",
        stories: [],
        image : "images/القرآن الكريم.png"
    },
    {
        isbn: "978-9770917896",
        title: "الأرض",
        price: "20000 ل.س",
        publisher: "دار الهلال",
        category: "رواية",
        summary: "رواية تتناول حياة الفلاحين في الريف المصري.",
        stories: [],
        image : "images/الأرض.jpg"
    },
    {
        isbn: "978-9770914567",
        title: "الطريق",
        price: "22000 ل.س",
        publisher: "دار الشروق",
        category: "رواية",
        summary: "رواية تتحدث عن الصراع بين الخير والشر.",
        stories: [],
        image : "images/الطريق.jpg"
    },
    {
        isbn: "978-9770911238",
        title: "زقاق المدق",
        price: "17000 ل.س",
        publisher: "دار المعارف",
        category: "رواية",
        summary: "رواية تتناول حياة الناس في زقاق المدق بالقاهرة.",
        stories: [],
        image : "images/زقاق_المدق.svg"
    },
    {
        isbn: "978-9770917890",
        title: "الحرافيش",
        price: "19000 ل.س",
        publisher: "دار الشروق",
        category: "رواية",
        summary: "رواية تتناول حياة مجموعة من الأشخاص في حي شعبي.",
        stories: [],
        image : "images/الحرافيش.jpg"
    }
];

$(document).ready(function() {

    let selectedIsbn = null; // selected Book

    // birheDate Formatter 
    $("#birthDate").datepicker({
        dateFormat: "dd-mm-yy", 
        changeMonth: true, 
        changeYear: true,
        changeDay: true,
    });

    // عرض الكتب في الجدول
    books.forEach(book => {
        $("#booksTable tbody").append(`
            <tr>
                <td>${book.isbn}</td>
                <td>${book.title}</td>
                <td>${book.price}</td>
                <td class="showDetails"><input type="checkbox" class="detailsBtn" data-isbn="${book.isbn}" id="${book.isbn}"><label for="${book.isbn}">إظهار التفاصيل</label></td>
                <td style="text-align: center"><button class="orderBtn" data-isbn="${book.isbn}" data-title="${book.title}">طلب الكتاب</button></td>
            </tr>
        `);
    });
    
    // إظهار / إخفاء تفاصيل الكتاب
    
    $(document).on("click", ".detailsBtn", function() {
        selectedIsbn = $(this).data("isbn");
        var book = books.find(b => b.isbn === selectedIsbn);
        var detailsRow = $(this).closest("tr").next(".details");

        if (detailsRow.length) {
            detailsRow.toggle();
        } else {
            var bookDetails = `
                <tr class="details">
                    <td colspan="5" style="">
                        <div style="display: flex; justify-content:space-between">
                            <div>
                                <p>دار النشر: ${book.publisher}</p>
                                <p>تصنيف الكتاب: ${book.category}</p>
                                <p>ملخص: ${book.summary}</p>
                                ${book.stories.length ? `<p>أهم القصص: ${book.stories.join(", ")}</p>` : ""}
                            </div>
                            <img src="${book.image}" alt="${book.title}" width=auto height=200px class="bookImg "/>
                        </div>
                    </td>
                </tr>
            `;
            $(this).closest("tr").after(bookDetails);
        }
    });

    // فتح النموذج عند الضغط على زر الطلب
    
    $(document).on("click", ".orderBtn", function() {
        selectedIsbn = $(this).data("isbn");
        var bookTitle = $(this).data("title");
        $("#bookTitle").text(bookTitle); 
        $("#overlay").show();
        $("#orderForm").show();
    });

    // إغلاق النموذج عند الضغط على زر الإغلاق
    $("#closeForm").click(function() {
        $("#orderForm").hide();
        $("#overlay").hide();
        resetForm(); // إفراغ النموذج عند الإغلاق
    });

    // إغلاق النموذج عند النقر خارج النموذج
    $("#overlay").click(function() {
        $("#orderForm").hide();
        $("#overlay").hide();
        resetForm(); // إفراغ النموذج عند الإغلاق
    });

    // التحقق من صحة المدخلات بشكل لحظي
    $("#bookOrderForm input").on("input", function() {
        validateInput($(this));
    });

    // إرسال النموذج
    $("#bookOrderForm").submit(function(event) {
        event.preventDefault();
        let isValid = true;
        $("#bookOrderForm input").each(function() {
            if (!validateInput($(this))) {
                isValid = false;
            }
        });

        if (isValid && selectedIsbn) {
            const selectedBook = books.find(book => book.isbn === selectedIsbn); 

            localStorage.setItem("selectedBook", JSON.stringify(selectedBook));
            if(selectedBook) {
            // توجيه المستخدم إلى صفحة تفاصيل الطلب
            window.location.href = "details.html";
            $("#orderForm").hide();
            $("#overlay").hide();
            resetForm();  // إفراغ النموذج بعد الإرسال الناجح
            }
            else {
                alert("حدث خطأ أثناء اختيار الكتاب.");
            }
        } else {
            alert("الرجاء تصحيح الأخطاء قبل الإرسال.");
        }
    });


    // دالة لتنسيق التاريخ من yyyy-mm-dd إلى dd-mm-yyyy
    // function formatDateToDDMMYYYY(dateString) {
    //     const date = new Date(dateString);
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const year = date.getFullYear();
    //     return `${day}-${month}-${year}`;
    // }

      // $("#birthDate").on("change", function() {
    //     const dateValue = $(this).val();
    //     if (dateValue) {
    //         const formattedDate = formatDateToDDMMYYYY(dateValue);
    //         $(this).val(formattedDate);
    //     }
    // });

    // دالة التحقق من صحة المدخلات
    function validateInput(input) {
        const value = input.val().trim();
        const errorElement = $(`#${input.attr("id")}Error`);

        if (input.attr("id") === "fullName" && value !== "") {
            const arabicPattern = /^[\u0600-\u06FF\s]+$/;
            if (!arabicPattern.test(value)) {
                showError(input, errorElement, "الاسم الكامل يجب أن يكون باللغة العربية فقط.");
                return false;
            } else {
                showSuccess(input, errorElement);
                return true;
            }
        }

        if (input.attr("id") === "nationalId") {
            if (value.length !== 11 || isNaN(value)) {
                showError(input, errorElement, "الرقم الوطني يجب أن يتكون من 11 رقمًا.");
                return false;
            } else {
                showSuccess(input, errorElement);
                return true;
            }
        }

        


        // if (input.attr("id") === "birthDate") {
        //    
        //         const datePattern = /^\d{2}-\d{2}-\d{4}$/;
        //         if (!datePattern.test(value)) {
        //             showError(input, errorElement, "تاريخ الولادة يجب أن يكون بتنسيق dd-mm-yyyy.");
        //             return false;
        //         } else {
        //             showSuccess(input, errorElement);
        //             return true;
        //         }
        // }

        if (input.attr("id") === "phoneNumber" && value !== "") {
            const phonePattern = /^(093|094|095|098|096|099)\d{7}$/;
            if (!phonePattern.test(value)) {
                showError(input, errorElement, "  رقم الموبايل غير صحيح. يجب أن يبدأ بـ 093 أو 094 أو 095 أو 098 أو 096 أو 099");
                return false;
            } else {
                showSuccess(input, errorElement);
                return true;
            }
        }

        if (input.attr("id") === "email" && value !== "") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                showError(input, errorElement, "البريد الإلكتروني غير صحيح.");
                return false;
            } else {
                showSuccess(input, errorElement);
                return true;
            }
        }

        return true;
    }

    // دالة إظهار الخطأ
    function showError(input, errorElement, message) {
        input.removeClass("valid").addClass("invalid");
        errorElement.text(message);
    }

    // دالة إظهار النجاح
    function showSuccess(input, errorElement) {
        input.removeClass("invalid").addClass("valid");
        errorElement.text("");
    }

    // دالة إفراغ النموذج
    function resetForm() {
        $("#bookOrderForm")[0].reset(); // إعادة تعيين النموذج
        $("#bookOrderForm input").removeClass("valid invalid"); // إزالة ألوان الحدود
        $(".validation-message").text(""); // إزالة رسائل التحقق
    }
});